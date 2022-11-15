import express from "express";
const router = express.Router();

import { getLiveChatId } from "../controllers/LiveChatController";

// youtube live chat endpoint
router.get("/livechat/:channel", async (req, res) => {
  const result = await getLiveChatId(req.params.channel);
  console.log(result);
  res.set("Access-Control-Allow-Origin", "*");
  res.json({
    liveChatId: result,
  });
});

export default router;
