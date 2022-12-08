import express from "express";
const router = express.Router();

import { submitFeedback } from "../controllers/FeedbackController";

// Authorization middleware
import babbleAuthorization from "../middleware/babbleAuthorization";

// create application/json parser
import bodyParser from "body-parser";
const bodyEncoder = bodyParser.json();

// Feedback POST endpoint
router.post("/", bodyEncoder, babbleAuthorization, submitFeedback);

export default router;
