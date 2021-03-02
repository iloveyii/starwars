const apiServer = process.env.API_URL
  ? process.env.API_URL + ":" + process.env.API_PORT
  : "http://localhost:9000";
console.log("apiServer:", apiServer);

export { apiServer };
