import { twitchApplication } from "../config/twitch.js";

/**
 * Retrieve dynamic oAuth2 link for both platforms
 * @param {Request} req
 * @param {Response} res
 * @returns string
 */
export const getRedirectionUrl = (req, res) => {
  let url;

  if (req.params.platform === "twitch") {
    url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${
      twitchApplication.client_id
    }&redirect_uri=${twitchApplication.redirection_url}${encodeURIComponent(
      twitchApplication.scopes.join("+")
    ).replace("%2B", "+")}}`;
  }

  if (req.params.platform === "google") {
    url = "todo-google-redirect-url";
  }

  res.json({
    url: url,
  });
};

/**
 * Handle incoming callbacks for both Twitch and Google
 * @param {Request} req
 * @param {Response} res
 */
export const handleCallback = (req, res) => {
  res.json(req.params);
};
