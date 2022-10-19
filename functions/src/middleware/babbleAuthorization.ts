import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { firestore } from "../utilities/firebase";

export default function () {
  /**
   * This middleware validates that a 'Babble' authorization token is supplied and exists.
   *
   * @param req
   * @param res
   * @param next
   */
  return async function (req: any, res: any, next: any) {
    const authorizationHeader = req.get("Authorization");

    // Deny request if either the header is not set at all, or it doesn't start with the 'Babble' prefix
    if (
      typeof authorizationHeader === "undefined" ||
      authorizationHeader.startsWith("Babble") === false
    ) {
      res.status(401);
    }

    // Validate the given token actually (still) exists
    const babbleToken = authorizationHeader.substring(7);

    const accountsCollection = collection(firestore, "accounts");
    const accountsQuery = query(
      accountsCollection,
      where("token.babbleToken", "==", babbleToken)
    );

    const results = await getDocs(accountsQuery);

    // If the token is supplied but does not exist, throw error
    if (results.empty === true) {
      res.status(401);
    }

    // Token exists! Format document and pass it onto the next route
    const documents = results.docs.map((doc) => doc.data());
    res.locals.user = documents[0];

    next();
  };
}

