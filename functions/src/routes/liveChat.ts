import express from "express";
const router = express.Router();

import { getLiveChatId } from "../controllers/LiveChatController";

// youtube live chat endpoint
router.get("/livechat", getLiveChatId);

export default router;
