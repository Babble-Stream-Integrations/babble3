// Import configuration files
import functions from "firebase-functions";
import youtube from "./src/assets/youtube.js";
import twitch from "./src/assets/twitch.js";

// Import and set-up Express
import express from "express";
const app = express();
app.use("/youtube", youtube);
app.use("/twitch", twitch);

// eslint-disable-next-line no-undef
export default functions.region("europe-west1").https.onRequest(app);
