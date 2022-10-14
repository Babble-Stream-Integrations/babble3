import axios from "axios";
import * as express from "express";
import { helixConfig } from "../config/twitch";
const router = express.Router();

router.get("/viewcount/:broadcaster", (req: any, res: any) => {
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
      console.log(response.data[0]);
      res.set("Access-Control-Allow-Origin", "*");
      res.json({
        count: response.data.data[0].viewer_count,
      });
    });
});
export default router;
