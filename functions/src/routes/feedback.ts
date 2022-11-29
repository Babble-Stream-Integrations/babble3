import express from "express";
const router = express.Router();

import { submitFeedback } from "../controllers/FeedbackController";

// create application/json parser
var bodyParser = require("body-parser");
var bodyEncoder = bodyParser.json();

// oAuth2 callback end-point
router.post("/", bodyEncoder, submitFeedback);

export default router;
