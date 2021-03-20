module.exports = (app) => {
  var express = require("express");
  var router = express.Router();

  /* GET users listing. */
  app.get("/", function (req, res, next) {
    res.send("respond with a resource");
  });
};
