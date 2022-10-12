import { https } from "firebase-functions";
import { firestore, auth as _auth } from "firebase-admin";
import cookieParser from "cookie-parser";
import { randomBytes } from "crypto";
import { get } from "axios";
import admin from "firebase-admin";
admin.initializeApp({});

/**
 * Creates a configured simple-oauth2 client for Twitch.
 */
function twitchOAuth2Client() {
  // Twitch OAuth 2 setup
  // TODO: Configure the `twitch.client_id` and `twitch.client_secret` Google Cloud environment variables.
  const credentials = {
    client: {
      id: "6tpb2txpozzl7oy4wwnjxwvvw1bggy",
      secret: "xhrizc0pn2g6ge2cro9qgzh6y5vzqi",
    },
    auth: {
      tokenHost: "https://id.twitch.tv/",
      tokenPath: "/oauth2/token",
      authorizePath: "/oauth2/authorize",
    },
    options: {
      bodyFormat: "json",
      authorizationMethod: "body",
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("simple-oauth2").create(credentials);
}

export const twitch_redirect = https.onRequest((req, res) => {
  const oauth2 = twitchOAuth2Client();

  cookieParser()(req, res, () => {
    const state = req.cookies.state || randomBytes(20).toString("hex");
    console.log("Setting verification state:", state);
    res.cookie("state", state.toString(), { maxAge: 3600000, httpOnly: true });
    const redirectUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: "localhost:3000/login",
      scope: "user:read:email",
      state: state,
    });
    console.log("Redirecting to:", redirectUri);
    res.redirect(redirectUri);
  });
});

export const twitch_token = https.onRequest(async (req, res) => {
  const oauth2 = twitchOAuth2Client();

  try {
    cookieParser()(req, res, async () => {
      console.log("Received verification state:", req.cookies.state);
      console.log("Received state:", req.query.state);
      if (!req.cookies.state) {
        throw new Error(
          "State cookie not set or expired. Maybe you took too long to authorize. Please try again."
        );
      } else if (req.cookies.state !== req.query.state) {
        throw new Error("State validation failed");
      }
      console.log("Received auth code:", req.query.code);
      try {
        const results = await oauth2.authorizationCode.getToken({
          code: req.query.code,
          redirect_uri: "localhost:3000/login",
        });
        console.log("Auth code exchange result received");

        var twitchUser = await getTwitchUser(results.access_token);
        twitchUser["access_token"] = results.access_token;

        // Create a Firebase account and get the Custom Auth Token.
        const firebaseToken = await createFirebaseAccount(twitchUser);
        // Serve an HTML page that signs the user in and updates the user profile.
        return res.jsonp({ token: firebaseToken });
      } catch (error) {
        return res.jsonp({ error: error.toString() });
      }
    });
  } catch (error) {
    return res.jsonp({ error: error.toString() });
  }
});

/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
async function createFirebaseAccount(twitchUser) {
  // The UID we'll assign to the user.
  const uid = `twitch:${twitchUser.id}`;

  // Save the access token to the Firebase Database.
  const db = firestore();
  const databaseTask = db.collection("users").doc(uid).set(twitchUser);

  // Create or update the user account.
  const userCreationTask = _auth()
    .updateUser(uid, {
      displayName: twitchUser["display_name"],
      photoURL: twitchUser["profile_image_url"],
    })
    .catch((error) => {
      // If user does not exists we create it.
      if (error.code === "auth/user-not-found") {
        return _auth().createUser({
          uid: uid,
          displayName: twitchUser["display_name"],
          photoURL: twitchUser["profile_image_url"],
        });
      }
      throw error;
    });

  // Wait for all async task to complete then generate and return a custom auth token.
  await Promise.all([userCreationTask, databaseTask]);
  // Create a Firebase custom auth token.
  const token = await _auth().createCustomToken(uid);
  console.log('Created Custom token for UID "', uid, '" Token:', token);
  return token;
}

async function getTwitchUser(accessToken) {
  try {
    const response = await get("https://api.twitch.tv/helix/users", {
      headers: {
        "Client-Id": "6tpb2txpozzl7oy4wwnjxwvvw1bggy",
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data.data[0];
  } catch (error) {
    console.error(error);
  }
}
