import express from "express";
import { Request, Response, NextFunction } from "express";
import schema from "../controllers/graphql";

import { graphqlHTTP } from "express-graphql";

const router = express.Router();
// GraphiQL
router.route("/").get(
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Query
router.route("/").post(
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

export default router;
