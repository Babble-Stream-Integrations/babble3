import * as express from "express";
import babbleAuthorization from "../middleware/babbleAuthorization";

const router = express.Router();

// Apply Babble authorization
router.use(babbleAuthorization());

router.get("/", (req, res) => {
  res.json({
    message: "Routes using this middleware can now utilize: res.locals.user",
    user: res.locals.user,
  });
});

export default router;

