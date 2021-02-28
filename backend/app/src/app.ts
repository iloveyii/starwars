// ----------------------------------
// Package Import
// ----------------------------------
import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import helmet from "helmet";
import * as path from "path";

import fileUpload from "express-fileupload";

// ----------------------------------
// Middleware Import
// ----------------------------------
import { errorHandler } from "./middlewares/error_handler";
import { notFound } from "./middlewares/not_found";

// ----------------------------------
// Routes Import
// ----------------------------------
import login from "./routes/login";
import user from "./routes/user";
import graphql from "./routes/graphql";
import settings from "./routes/setting";
import confirms from "./routes/confirms";
import default_route from "./routes/default_route";

// ----------------------------------
// Express configuration
// ----------------------------------
const app: any = express();
// app.use(express.json({ limit: "50mb" }));
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 * 1024 * 1024 },
  })
);
// app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.resolve(__dirname, "../../", "frontend", "dist")));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// ----------------------------------
// Security - header
// ----------------------------------
app.use(helmet({ contentSecurityPolicy: false }));

// ----------------------------------
// Logging
// ----------------------------------
app.use(morgan("common"));

// ----------------------------------
// EJS Layouts
// ----------------------------------
app.use(expressLayouts);
// app.set("views", path.join(__dirname, "views"));
app.set("views", path.resolve(__dirname, "../../", "frontend", "dist"));
app.set("view engine", "ejs");

// ----------------------------------
// API Routes
// ----------------------------------
app.use("/api/v1/logins", login);
app.use("/api/v1/users", user);
app.use("/api/v1/confirms", confirms);
app.use("/api/v1/settings", settings);
app.use("/graphql*", graphql);
// app.use("*", default_route);

// ----------------------------------
// Not found - 404
// ----------------------------------
// app.use(notFound);

// ----------------------------------
// Error handling
// ----------------------------------
app.use(errorHandler);

// ----------------------------------
// Export app
// ----------------------------------
export default app;
