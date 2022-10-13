// Import configuration files
import functions from "firebase-functions";

// Import and set-up Express
import express from "express";
const app = express();

// Import routing files
import viewCountRoutes from "./src/routes/viewCount.js";
import oAuth2Routes from "./src/routes/oauth2.js";

// Declare routes
app.use("/view-count", viewCountRoutes);
app.use("/oauth2", oAuth2Routes);

// eslint-disable-next-line no-undef
export default functions.region("europe-west1").https.onRequest(app);
