// Import config
import { twitchApplication } from "../config/twitch";
import { youtubeConfig } from "../config/youtube";
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
import { YoutubeToken } from "../types/oAuth2/YoutubeToken";
import { YoutubeProfile } from "../types/oAuth2/YoutubeProfile";

//import express types
import type { Request, Response } from "express";

/**
 * Retrieve dynamic oAuth2 link for both platforms
 * @param {Request} req
 * @param {Response} res
 * @returns string
 */
export const getRedirectionUrl = (req: Request, res: Response) => {
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
  if (req.params.platform === "youtube") {
    url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${youtubeConfig.scope}
    &redirect_uri=${youtubeConfig.callbackUrl}
    &response_type=token
    &client_id=${youtubeConfig.clientId}`;
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
export const handleCallback = (req: Request, res: Response) => {
  if (req.params.platform === "twitch") {
    handleTwitchCallback(req, res);
    return;
  }

  handleGoogleCallback(req, res);
};

const handleTwitchCallback = (req: Request, res: Response) => {
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
          //get perfect avatar size
          let avatar = userData.profile_image_url;
          if (avatar.includes("300x300")) {
            avatar = avatar.replace("300x300", "150x150");
          }
          const profile: TwitchProfile = {
            uid: userData.id,
            username: userData.login,
            displayName: userData.display_name,
            email: userData.email,
            avatar: avatar,
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
              res.redirect(redirectUrl.toString());
            });

            return;
          } else {
            // Account does not yet exist, lets create it before redirecting

            await setDoc(accountReference, accountDocument).then(() => {
              // Redirect back to the front-end application
              res.redirect(redirectUrl.toString());
            });
          }
        });
    });
};

const handleGoogleCallback = (req: Request, res: Response) => {
  axios
    .post(
      `https://oauth2.googleapis.com/token?client_id=${youtubeConfig.clientId}&client_secret=${youtubeConfig.clientSecret}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=${youtubeConfig.callbackUrl}`
    )
    .then((response) => {
      const token: YoutubeToken = {
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in,
        refreshToken: response.data.refresh_token,
        tokenType: response.data.token_type,
        babbleToken: generateToken(),
      };

      axios
        .get(
          `https://www.googleapis.com/youtube/v3/channels?access_token=${token.accessToken}&part=snippet&mine=true`
        )
        .then((response) => {
          const userData = response.data.items[0];
          axios
            .get("https://www.googleapis.com/oauth2/v1/userinfo", {
              headers: {
                Authorization: "Bearer " + token.accessToken,
              },
            })
            .then(async (response) => {
              const profile: YoutubeProfile = {
                uid: userData.id,
                username: userData.snippet.title,
                displayName: response.data.given_name,
                email: response.data.email,
                avatar: userData.snippet.thumbnails.default.url,
                platform: req.params.platform.toLowerCase(),
              };
              console.log(profile);
              // const accountDocument: AccountDocument = {
              //   ...profile,
              //   token: token,
              // };

              // Store the profile and token in FireStore
              // const snapshot = collection(firestore, "accounts");
              // const accountReference = doc(snapshot);

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

                // const accountDocumentId = results.docs[0].id;
                // const documentReference = doc(
                //   firestore,
                //   "accounts",
                //   accountDocumentId
                // );

                // Merge the new information with the existing document
                // setDoc(
                //   documentReference,
                //   {
                //     ...accountDocument,
                //   },
                //   {
                //     merge: true,
                //   }
                // ).then(() => {
                // Redirect back to the front-end application
                res.redirect(redirectUrl.toString());
                // });

                return;
              } else {
                // Account does not yet exist, lets create it before redirecting

                // await setDoc(accountReference, accountDocument).then(() => {
                // Redirect back to the front-end application
                res.redirect(redirectUrl.toString());
                // });
              }
            });
        });
    });
};
