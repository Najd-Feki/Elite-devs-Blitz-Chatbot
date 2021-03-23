module.exports = (app) => {
    var express = require("express");
    var router = express.Router();
  
  // GET all profile
    app.get("/", function (req, res, next) {
      res.send("...");
    });
  
  // GET profile by id
    app.get("/:id", function (req, res, next) {
      var id = req.params.id;
      res.send("...");
    });
  
  // add profile 
      app.post('/add', function (req, res) {
        res.send("...");
      });
  
  // delete profile
  app.delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    res.send("...");
  });    
  
  // modify profile 
  app.put('/modify/:id', function (req, res) {
    var id = req.params.id;
    res.send("...");
  });
  };