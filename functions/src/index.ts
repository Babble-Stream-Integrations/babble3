// Import configuration files
import * as functions from "firebase-functions";

// Import and set-up Express
import express from "express";
// import cors from "cors";
const app = express();

// Import routing files
import viewCountRoutes from "./routes/viewCount";
import oAuth2Routes from "./routes/oauth2";

// Declare routes
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/view-count", viewCountRoutes);
app.get("/oauth2", oAuth2Routes);

// eslint-disable-next-line no-undef
export default functions.region("europe-west1").https.onRequest(app);
