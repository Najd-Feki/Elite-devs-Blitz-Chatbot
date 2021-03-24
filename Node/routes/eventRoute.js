module.exports = (app) => {
  var express = require("express");
  const Event = require("../models/event");
  // GET all events
  app.get("/event", async function (req, res, next) {
    await Event.find(function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json(data);
    });
  });

  // GET event by id
  app.get("/event/:id", async function (req, res, next) {
    var id = req.params.id;
    await Event.findById(id, function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json(data);
    });
  });

  // add event
  app.post("/event/add", async function (req, res) {
    var event = new Event();
    event.subject = req.body.subject;
    event.date = req.body.date;
    event.location = req.body.location;
    //res.send(req.body);
    try {
      var eventlog = await event.save();
      console.log(eventlog);
      res.send("event added");
    } catch (err) {
      console.log(err);
    }
  });

  // delete event
  app.delete("/event/delete/:id", async function (req, res) {
    var id = req.params.id;
    await Event.findByIdAndRemove(id, function (err, doc) {
      if (err) {
        console.log(err);
      }
      res.send("event removed");
    });
  });

  // modify event
  app.put("/event/modify/:id", async function (req, res) {
    var id = req.params.id;
    await Event.findByIdAndUpdate(id, { $set: req.body }, function (err, doc) {
      if (err) {
        console.log(err);
      }
      res.send("event updated");
      console.log(doc);
    });
  });
};
