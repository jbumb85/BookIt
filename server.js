// This will be our express web server
require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.static("./dist/book-app"))

app.get("/*", (_req, res) =>
  res.sendFile("index.html", { root }))

app.listen(process.env.PORT || 8080)


// npm run start:server
