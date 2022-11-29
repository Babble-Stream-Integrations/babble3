// Import app config
import { appConfig } from "../config/app";

// Import Axios
import axios from "axios";

/**
 * Submit feedback using a Discord Webhook
 *
 * @param {Request} req
 * @param {Response} res
 * @returns string
 */
export const submitFeedback = (req: any, res: any) => {
  // Submit feedback to Discord
  axios.post(appConfig.webhooks.feedback, {
    content: `📩 **Feedback received from '${req.body.username}':**\n${req.body.feedback}`,
  });

  // Return success message
  res.status(201).json({
    message: "Feedback submitted successfully",
  });
};
