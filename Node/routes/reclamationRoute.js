module.exports = (app) => {
    var express = require("express");
    var router = express.Router();
  
  // GET all reclamation
    app.get("/", function (req, res, next) {
      res.send("...");
    });
  
  // GET reclamation by id
    app.get("/:id", function (req, res, next) {
      var id = req.params.id;
      res.send("...");
    });
  
  // add reclamtion 
      app.post('/add', function (req, res) {
        res.send("...");
      });
  
  // delete reclamation
  app.delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    res.send("...");
  });    
  
  // modify reclamation 
  app.put('/modify/:id', function (req, res) {
    var id = req.params.id;
    res.send("...");
  });
  };