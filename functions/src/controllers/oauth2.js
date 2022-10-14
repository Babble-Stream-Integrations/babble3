// Import Twitch application details
import { twitchApplication } from "../config/twitch.js";

// Import Firestore
import { firestore } from "../utilities/firebase.js";
import { collection, addDoc } from "firebase/firestore/lite";

// Import Axios
import axios from "axios";

/**
 * Retrieve dynamic oAuth2 link for both platforms
 * @param {Request} req
 * @param {Response} res
 * @returns string
 */
export const getRedirectionUrl = (req, res) => {
  let url;

  // Generate redirection URL for Twitch
  if (req.params.platform === "twitch") {
    url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${
      twitchApplication.client_id
    }&redirect_uri=${
      twitchApplication.redirection_url
    }&scope=${encodeURIComponent(twitchApplication.scopes.join("+")).replace(
      "%2B",
      "+"
    )}`;
  }

  // Generate redirection URL for Google
  if (req.params.platform === "google") {
    url = "todo-google-redirect-url";
  }

  // Return redirection URL
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
export const handleCallback = (req, res) => {
  let profile, token;

  axios
    .post(
      `https://id.twitch.tv/oauth2/token?client_id=${twitchApplication.client_id}&client_secret=${twitchApplication.client_secret}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=${twitchApplication.redirection_url}`
    )
    .then((response) => {
      token = response.data;

      axios
        .get(`https://api.twitch.tv/helix/users`, {
          headers: {
            "Client-Id": twitchApplication.client_id,
            Authorization: `Bearer ${token.access_token}`,
          },
        })
        .then((response) => {
          profile = response.data.data[0];

          // At this point, we'll have defined both 'profile' and 'token' variables. Lets store both variables in FireStore
          try {
            const accountCollection = collection(firestore, "accounts");

            addDoc(accountCollection, {
              // TODO: Convert project to TypeScript and create type for this specific case
              uid: profile.id,
              name: profile.login,
              displayName: profile.display_name,
              email: profile.email,
              avatar: profile.profile_image_url,
              platform: "twitch",
              accessToken: token.access_token,
              refreshToken: token.refresh_token,
              expiresIn: token.expires_in,
            })
              .then(() => {
                res.redirect(
                  `${twitchApplication.redirection_url_application}?uid=${profile.id}`
                );
              })
              .catch(() => {
                res.send("Something went wrong..");
              });
          } catch (e) {
            console.error(e);
            res.json({
              error: 530,
              message:
                "Unable to create your user profile.. Please contact the site administrator.",
            });
          }
        })
        .catch((e) => {
          console.error(e);
          res.json({
            error: 531,
            message:
              "Unable to create your user profile.. Please contact the site administrator.",
          });
        });
    })
    .catch((e) => {
      console.error(e);
      res.json({
        error: 532,
        message:
          "Unable to create your user profile.. Please contact the site administrator.",
      });
    });
};
