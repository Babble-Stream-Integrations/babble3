// Import configuration files
import { helixConfig } from "./src/config/helix.js";
import functions from "firebase-functions";

// Import and set-up Express
import express from "express";
const app = express();

// Import Axios
import axios from "axios";

// Import both Firebase & Firestore

app.get("/view-count/:broadcaster", (req, res) => {
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
// eslint-disable-next-line no-undef
export default functions.region("europe-west1").https.onRequest(app);
