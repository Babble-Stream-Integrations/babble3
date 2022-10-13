import express from "express";
const router = express.Router();

import { handleCallback, getRedirectionUrl } from "../controllers/oauth2.js";

// oAuth2 callback end-point
router.get("/callback/:platform(google|twitch)", handleCallback);
router.get("/redirection/:platform(google|twitch)", getRedirectionUrl);

export default router;
