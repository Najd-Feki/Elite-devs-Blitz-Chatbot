module.exports = (app) => {
  var express = require("express");
  const Reclamation = require("../models/reclamation");
  // GET all reclamation
  app.get("/reclamation", async function (req, res, next) {
    await Reclamation.find(function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json(data);
    });
  });

  // GET reclamation by id
  app.get("/reclamation/:id", async function (req, res, next) {
    var id = req.params.id;
    await Reclamation.findById(id, function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json(data);
    });
  });

  // add reclamtion
  app.post("/reclamation/add", async function (req, res) {
    var reclamation = new Reclamation();
    reclamation.userId = req.body.userId;
    reclamation.date = req.body.date;

    try {
      var reclamationlog = await reclamation.save();
      console.log(reclamationlog);
      res.send("reclamation added");
    } catch (err) {
      console.log(err);
    }
  });

  // delete reclamation
  app.delete("/reclamation/delete/:id", async function (req, res) {
    var id = req.params.id;
    await Reclamation.findByIdAndRemove(id, function (err, doc) {
      if (err) {
        console.log(err);
      }
      res.send("reclamation removed");
    });
  });

  // modify reclamation
  app.put("/reclamation/modify/:id", async function (req, res) {
    var id = req.params.id;
    await Reclamation.findByIdAndUpdate(id, { $set: req.body }, function (err, doc) {
      if (err) {
        console.log(err);
      }
      res.send("reclamation updated");
      console.log(doc);
    });
  });
};
