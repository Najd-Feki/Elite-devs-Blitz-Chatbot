module.exports = (app) => {
    var express = require("express");
    const Course = require("../models/AdminCourse");
    const User = require('../models-auth/User');
    const nodemailer = require('nodemailer');
    const Courses = require("../models/course.js");

    let trasporter = nodemailer.createTransport({
        service :'gmail',
        auth :{
          user: 'blitz.devs@gmail.com',
          pass :'elitedevs0000'
        }
    });
    let mailOptions = {
      from :'mehdihrairi6@gmail.com',
      to:'mehdi.hrairi@esprit.tn',
      subject:'test',
      text:'IT WORKS !!!'
    };

    app.get("/allcourses", async function (req, res, next) {
      await Course.find(function (err, data) {
        if (err) {
          console.log(err);
        }
        res.json(data);
      });
    });
  
    // GET event by id
    app.get("/blitzcourse/:id", async function (req, res, next) {
      const id = req.params.id;
      await Course.findById(id, function (err, data) {
        if (err) {
          console.log(err);
        }
        res.json(data);
      });
    });
  
    // add event
    app.post("/blitzcourse/add", async function (req, res) {
      var course = new Course();
      course.title = req.body.title;
      course.field = req.body.field;
      course.description = req.body.description;
      course.tags = req.body.tags;
      course.selectedFile = req.body.selectedFile;
      course.likeCount = req.body.likeCount;
      course.createdAt = req.body.createdAt;
      course.quiz = req.body.quiz;
      course.numberOfEnrolls = req.body.numberOfEnrolls;
      course.tutorName = req.body.tutorName;
      course.tutorDetails = req.body.tutorDetails;
      //res.send(req.body);
      try {
        var courselog = await course.save();
        console.log(courselog);
        console.log("added");
        res.send("course added");
      } catch (err) {
        console.log(err);
      }
    });
  
    // delete event
    app.delete("/blitzcourse/delete/:id", async function (req, res) {
      var id = req.params.id;
      await Course.findByIdAndRemove(id, function (err, doc) {
        if (err) {
          console.log(err);
        }
        res.send("course removed");
      });
    });
  
    // modify event
    app.put("/blitzcourse/modify/:id", async function (req, res) {
      var id = req.params.id;
      await Course.findByIdAndUpdate(id, { $set: req.body }, function (err, doc) {
        if (err) {
          console.log(err);
        }
        res.send("course updated");
        console.log(doc);
      });
    });
    app.put("/enroll/:idUser/:Course", async function (req, res) {
      const filter = req.params.idUser;
      const c = new Course({_id :req.params.Course.id });
      const courses = new Courses();
      const idCourse = {
        $push: {
          courses:
          c,
        },
      };
      await User.findByIdAndUpdate({"_id":req.params.idUser}, idCourse   , function (err, doc) {
        if (err) {
          console.log(err);
        }
        trasporter.sendMail(mailOptions,function(err,data){
          if(err){console.log(err);}
          console.log('email sent');
        });
        console.log(doc);
      });
    });
    app.post("/addcourse", async function (req, res) {
      var course = new Courses();
      course.title = req.body.title;
      course.url = req.body.url;
      course.price = req.body.price;
      course.isPaid = req.body.isPaid;
      course.headline = req.body.headline;
      course.rating = req.body.rating;
      course.image_480x270 = req.body.image_480x270;
      course.completionRatio = req.body.completionRatio;
      course.visible_instructors = req.body.visible_instructors;
      console.log(course.title);
      //res.send(req.body);
      try {
        var courselog = await course.save();
        console.log(courselog);
        console.log("added");
        res.send("course added");
      } catch (err) {
        console.log(err);
      }
    });
    app.get("/blitzcourse/field", async function (req, res, next) {
      try{
      await Course.find.sort({field : "Front end"});
    res.status(200).json(doc);}
    catch(error){next(error)}
    });
  };
  
  
  