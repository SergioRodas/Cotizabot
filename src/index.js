const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

//settings
app.set("port", 3000);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//middlewares

//routes

//static files

//listening the server
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
