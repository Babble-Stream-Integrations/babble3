// Import config
import { twitchApplication } from "../config/twitch";
import { appConfig } from "../config/app";

// Import scope parser utility
import { parseScope } from "../utilities/encoder";

// Import types
import { TwitchToken } from "../types/oAuth2/TwitchToken";
import { TwitchProfile } from "../types/oAuth2/TwitchProfile";
import { AccountDocument } from "../types/oAuth2/AccountDocument";

// Import Firestore
import { firestore } from "../utilities/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";

// Import Axios
import axios from "axios";
import { generateToken } from "../utilities/tokenGenerator";

/**
 * Retrieve dynamic oAuth2 link for both platforms
 * @param {Request} req
 * @param {Response} res
 * @returns string
 */
export const getRedirectionUrl = (req: any, res: any) => {
  let url;

  // Generate redirection URL for Twitch
  if (req.params.platform === "twitch") {
    url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${
      twitchApplication.clientId
    }&redirect_uri=${twitchApplication.callbackUrl}&scope=${parseScope(
      twitchApplication.scopes
    )}`;
  }

  // Generate redirection URL for Google
  if (req.params.platform === "google") {
    url = "todo-google-redirect-url";
  }

  // Return redirection URL
  res.set("Access-Control-Allow-Origin", "*");
  res.json({
    url: url,
  });
};

/**
 * Handle incoming callbacks for both Twitch and Google
 * @todo Implement same logic, but for Google
 * @param {Request} req
 * @param {Response} res
 */
export const handleCallback = (req: any, res: any) => {
  if (req.params.platform === "twitch") {
    handleTwitchCallback(req, res);
    return;
  }

  handleGoogleCallback(req, res);
};

const handleTwitchCallback = (req: any, res: any) => {
  const authenticationCode = req.query.code;

  // Retrieve Access Token from Twitch by using the newly acquired code
  axios
    .post(
      `https://id.twitch.tv/oauth2/token?client_id=${twitchApplication.clientId}&client_secret=${twitchApplication.clientSecret}&code=${authenticationCode}&grant_type=authorization_code&redirect_uri=${twitchApplication.callbackUrl}`
    )
    .then((response) => {
      // Lets declare a variable with the given credentials
      const token: TwitchToken = {
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in,
        refreshToken: response.data.refresh_token,
        tokenType: response.data.token_type,
        babbleToken: generateToken(),
      };

      // Retrieve user profile using the access token
      axios
        .get(`https://api.twitch.tv/helix/users`, {
          headers: {
            "Client-Id": twitchApplication.clientId,
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then(async (response) => {
          const userData = response.data.data[0];
          const profile: TwitchProfile = {
            uid: userData.id,
            username: userData.login,
            displayName: userData.display_name,
            email: userData.email,
            avatar: userData.profile_image_url,
            platform: req.params.platform.toLowerCase(),
          };

          const accountDocument: AccountDocument = {
            ...profile,
            token: token,
          };

          // Store the profile and token in FireStore
          const snapshot = collection(firestore, "accounts");
          const accountReference = doc(snapshot);

          const redirectUrl = new URL(appConfig.webApp.authEndpoint);

          // Append all profile variables to the searchParams
          Object.entries(profile).forEach((entry) => {
            const [key, value] = entry;
            redirectUrl.searchParams.append(key, value);
          });

          redirectUrl.searchParams.append("babbleToken", token.babbleToken);

          // Create account document, updating it if it already exists
          const accountsCollection = collection(firestore, "accounts");
          const accountsQuery = query(
            accountsCollection,
            where("platform", "==", profile.platform),
            where("uid", "==", profile.uid)
          );

          const results = await getDocs(accountsQuery);

          if (results.empty === false) {
            // Account already exists, lets update it and then redirect

            const accountDocumentId = results.docs[0].id;
            const documentReference = doc(
              firestore,
              "accounts",
              accountDocumentId
            );

            // Merge the new information with the existing document
            setDoc(
              documentReference,
              {
                ...accountDocument,
              },
              {
                merge: true,
              }
            ).then(() => {
              // Redirect back to the front-end application
              res.redirect(redirectUrl);
            });

            return;
          } else {
            // Account does not yet exist, lets create it before redirecting

            await setDoc(accountReference, accountDocument).then(() => {
              // Redirect back to the front-end application
              res.redirect(redirectUrl);
            });
          }
        });
    });
};

const handleGoogleCallback = (req: any, res: any) => {
  // TODO: Handle Google oAuth2 callback
};
