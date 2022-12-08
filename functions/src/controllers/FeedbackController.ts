// Import app config
import { appConfig } from "../config/app";

// Import Axios
import axios from "axios";

import type { Request, Response } from "express";

/**
 * Submit feedback using a Discord Webhook
 *
 * @param {Request} req
 * @param {Response} res
 * @returns string
 */
export const submitFeedback = (req: Request, res: Response) => {
  // Validate the given data
  if (
    typeof req.body.type === "undefined" ||
    typeof req.body.subject === "undefined" ||
    typeof req.body.feedback === "undefined" ||
    ["ideas", "bugs", "comments"].includes(req.body.type) === false
  ) {
    return res.status(400).send("Invalid request");
  }

  // Submit feedback to Discord
  axios.post(
    appConfig.webhooks[req.body.type as keyof typeof appConfig.webhooks],
    {
      content: `@here **Feedback received from: ${
        // Username using Babble authorization, as a security/anti-impersonation measure
        res.locals.user.username
      }**\n\nSubject: ${req.body.subject ?? "No subject"}\n\`\`\`${
        req.body.feedback ?? "No feedback"
      }\`\`\``,
    }
  );

  // Return success message
  return res
    .set("Access-Control-Allow-Origin", "https://babble3.web.app")
    .set("Access-Control-Allow-Methods", "POST")
    .set("Access-Control-Allow-Headers", "Content-Type")
    .set("Content-Type", "application/json")
    .status(201)
    .json({
      message: "Feedback submitted successfully",
    });
};
