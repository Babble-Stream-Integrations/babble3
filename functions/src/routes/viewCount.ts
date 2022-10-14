import * as express from "express";
const router = express.Router();

// Import Axios
import axios from "axios";

// Import Twitch Helix configuration
import { helixConfig } from "../config/twitch.js";

router.get("/:broadcaster", (req, res) => {
  axios
    .get(
      `https://api.twitch.tv/helix/streams?user_login=${req.params.broadcaster}`,
      {
        headers: {
          Authorization: helixConfig.token,
          "Client-Id": helixConfig.clientId,
        },
      }
    )
    .then((response) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.json({
        count: response.data.data[0].viewer_count,
      });
    });
});

export default router;

