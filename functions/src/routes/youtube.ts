import * as express from "express";
import { getLiveChatId } from "../controllers/LiveChatController.js";

const router = express.Router();

router.get("/livechat/:channel", async (req, res) => {
  const result = await getLiveChatId(req.params.channel);
  res.set("Access-Control-Allow-Origin", "*");
  res.json({
    liveChatId: result,
  });
});

export default router;
