module.exports = (app) => {
    var express = require("express");
    var router = express.Router();
  
  // GET all events
    app.get("/", function (req, res, next) {
      res.send("...");
    });
  
  // GET event by id
    app.get("/:id", function (req, res, next) {
      var id = req.params.id;
      res.send("...");
    });
  
  // add event 
      app.post('/add', function (req, res) {
        res.send("...");
      });
  
  // delete event
  app.delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    res.send("...");
  });    
  
  // modify event 
  app.put('/modify/:id', function (req, res) {
    var id = req.params.id;
    res.send("...");
  });
  };