const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello bitches");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`connected on port : ${port}`);
});
