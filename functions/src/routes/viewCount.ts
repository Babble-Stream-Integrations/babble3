import * as express from "express";
import { getViewCount } from "../controllers/ViewCountController.js";

const router = express.Router();

router.get("/:platform(youtube|twitch)/:channel", async (req, res) => {
  const result = await getViewCount(req.params.channel, req.params.platform);
  res.set("Access-Control-Allow-Origin", "*");
  res.json({
    count: result,
  });
});

router.get("/poll-test", (req, res) => {
  res.status(418).send("Hello World!");
});

export default router;
