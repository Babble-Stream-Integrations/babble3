// Import configuration files
import * as functions from "firebase-functions";

//import routes
import ViewCount from "./routes/viewCount";

// Import and set-up Express
import express from "express";
import cors from "cors";
const app = express();
app.use("/viewcount", ViewCount);

// Import routing files
import viewCountRoutes from "./routes/viewCount";
import oAuth2Routes from "./routes/oauth2";

// Declare routes
app.use(cors({ origin: true }));
app.get("/view-count", viewCountRoutes);
app.get("/oauth2", oAuth2Routes);

// eslint-disable-next-line no-undef
export default functions.region("europe-west1").https.onRequest(app);
