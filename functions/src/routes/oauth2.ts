import express from "express";
const router = express.Router();

import {
  handleCallback,
  getRedirectionUrl,
} from "../controllers/AuthenticationController";

// oAuth2 callback end-point
router.get("/callback/:platform(youtube|twitch)", handleCallback);
router.get("/redirection/:platform(youtube|twitch)", getRedirectionUrl);

export default router;
