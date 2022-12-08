// Import configuration files
import * as functions from "firebase-functions";

// Import and set-up Express
import express from "express";
const app = express();

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");

  next();
});

// Import routing files
// import exampleAuthRoute from "./routes/exampleAuthRoute";
import viewCountRoutes from "./routes/viewCount";
import oAuth2Routes from "./routes/oauth2";
import feedbackRoutes from "./routes/feedback";

// Declare routes
app.use("/view-count", viewCountRoutes);
app.use("/oauth2", oAuth2Routes);
app.use("/feedback", feedbackRoutes);

app.get("/poll-test", (req, res) => {
  res.status(418).send("Hello World!");
});

// Example route using Babble Token authentication
// app.use("/example-auth-route", exampleAuthRoute);

// eslint-disable-next-line no-undef
export default functions.region("europe-west1").https.onRequest(app);
