module.exports = (app) => {
  var express = require("express");
  var router = express.Router();

// GET all users
  app.get("/", function (req, res, next) {
    res.send("...");
  });

// GET user by id
  app.get("/:id", function (req, res, next) {
    var id = req.params.id;
    res.send("...");
  });

// add user 
    app.post('/add', function (req, res) {
      res.send("...");
    });

// delete user
app.delete('/delete/:id', function (req, res) {
  var id = req.params.id;
  res.send("...");
});    

// modify user 
app.put('/modify/:id', function (req, res) {
  var id = req.params.id;
  res.send("...");
});
};
