// Import configuration files
import * as functions from "firebase-functions";
import youtube from "./assets/youtube";
import twitch from "./assets/twitch";

// Import and set-up Express
import express from "express";
const app = express();
app.use("/youtube", youtube);
app.use("/twitch", twitch);

// Import routing files
import viewCountRoutes from "./routes/viewCount";
import oAuth2Routes from "./routes/oauth2";

// Declare routes
app.use("/view-count", viewCountRoutes);
app.use("/oauth2", oAuth2Routes);

// eslint-disable-next-line no-undef
export default functions.region("europe-west1").https.onRequest(app);
