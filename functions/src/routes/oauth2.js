import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.sendStatus(400);
});

// oAuth2 callback end-point
router.get("/callback/:platform(google|twitch)", (req, res) => {
  res.json(req.params);
});

export default router;
