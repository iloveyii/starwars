import dotenv from "dotenv";
import boxen from "boxen";
import chalk from "chalk";
import socket from "socket.io";
import fs from "fs";
import http from "http";
import https from "https";
const session = require("express-session");

import app from "./src/app";
import { Database } from "./src/models/base/Database";

// ----------------------------------
// Environment setup
// ----------------------------------
dotenv.config({ path: ".env" });
const {
  API_URL = "http://localhost",
  API_PORT = 7700,
  SESS_NAME = "sid",
  SESS_SECRET = "top-secret",
  SESS_LIFETIME = 1000 * 60 * 60 * 2, // 2 hrs
  DB_NAME = "rdigital",
  DB_USER = "",
  DB_PASS = "",
} = process.env;

app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: "none",
      secure: false,
    },
  })
);

// ----------------------------------
// Connect to DB
// ----------------------------------
const db = new Database(DB_NAME, DB_USER, DB_PASS);
const db_connected = db.connect();
console.log("DB DB_NAME, DB_USER, DB_PASS", DB_NAME, DB_USER, DB_PASS);

// ----------------------------------
// Read certificate files
// ----------------------------------
const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/minsoft.se/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/minsoft.se/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/minsoft.se/chain.pem",
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

// ----------------------------------
// HTTP(s) servers
// ----------------------------------
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

/* httpServer.listen(API_PORT, () => {
  console.log("HTTP Server running on port 80");
}); */

httpsServer.listen(API_PORT, () => {
  console.log("HTTPS Server running on port " + API_PORT);
});

// ----------------------------------
// Express server
// ----------------------------------
/* const server = app.listen(API_PORT, () => {
  const ENV_MODE = process.env.NODE_ENV ? process.env.NODE_ENV : "prod";
  let message = `\n${chalk.bold(
    `SERVER is running on ${API_URL}:${API_PORT} in ${ENV_MODE} mode `
  )}`;
  message += `\n${chalk.green(
    "To change these config(server and port), edit .env file"
  )}`;
  if (db_connected) {
    message += `\n${chalk.blue("Mongodb connected to " + DB_NAME)}`;
  }
  message += `\n\n${chalk.red("Press CTRL-C to stop")}`;
  console.log(
    boxen(message, {
      padding: 1,
      borderColor: "green",
      margin: 1,
    })
  );
});
*/

// ----------------------------------
// Socket IO
// ----------------------------------
export const io = socket(server);
io.on("connection", (client) => {
  console.log("Made socket connection with id ", client.id);
  io.sockets.emit("connect", { status: 200 });
});

export default server;
