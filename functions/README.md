# Babble (functions)

## Using Babble Auth

To utilize the Babble token authorization, you should use the dedicated middleware:

```js
import * as express from "express";
import babbleAuthorization from "../middleware/babbleAuthorization";

const router = express.Router();

// Babble Auth middleware
router.use(babbleAuthorization());

router.get(...)
```

This will automatically validate that a (Babble) token has been given and is valid (exists in FireStore).

### Getting the user

When using the `babbleToken` middleware, you'll automatically get access to the user document, which you may access using `res.locals.user`

You could in turn use this to, for example, retrieve the email address of the user:

```js
const email = res.locals.user.email;
```

