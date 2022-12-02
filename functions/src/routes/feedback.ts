import express from "express";
const router = express.Router();

import { submitFeedback } from "../controllers/FeedbackController";

// create application/json parser
import bodyParser from "body-parser";
const bodyEncoder = bodyParser.json();

// Feedback POST endpoint
router.post("/", bodyEncoder, submitFeedback);

router.get("test", (req, res) => {
  res.send("Hello World!");
});

export default router;
