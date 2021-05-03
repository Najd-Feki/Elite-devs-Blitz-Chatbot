module.exports = (app) => {
  var express = require("express");
  const Course = require("../models/AdminCourse");
  const User = require("../models-auth/User");
  const nodemailer = require("nodemailer");
  const Courses = require("../models/course.js");
  const axios = require("axios");

  let trasporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "blitz.devs@gmail.com",
      pass: "elitedevs0000",
    },
  });
  let mailOptions = {
    from: "mehdihrairi6@gmail.com",
    to: "mehdi.hrairi@esprit.tn",
    subject: "test",
    text: "IT WORKS !!!",
  };

  app.get("/allcourses", async function (req, res, next) {
    await Course.find(function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json(data);
    });
  });

  app.get("/userCourses/:idUser", async function (req, res, next) {
    let a =" " ;
    let result = {};
    const c = await User.findOne({_id:req.params.idUser}, { _id:0, courses:1 })
    for(const values of c.courses){
     const t= await Course.findById({_id:values},{_id:0,title:1})
     a=a+t.title+" ";
     console.log(t);
    }
    res.send(a)
  });
  app.get("/recommandation/:recSeach", async function (req, res) {
    try {
      const a = req.params.recSeach;
      const UdemyUrl = `https://www.udemy.com/api-2.0/courses/?search=${a}/?fields[course]=@default,primary_category`;
      axios.defaults.headers.common["Authorization"] =
        "Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==";
      await axios.get(UdemyUrl).then((response) => {
        res.send(response.data.results);
        console.log(response.data.results);
      });
      res.end();
    } catch (error) {
      console.log(error);
    }
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
  app.put("/enroll/:idUser/", async function (req, res) {
    const course = new Courses({
      title: req.body.udemy.title,
      url: req.body.udemy.url,
      price: req.body.udemy.price,
      isPaid: req.body.udemy.isPaid,
      headline: req.body.udemy.headline,
      rating: req.body.udemy.rating,
      image_480x270: req.body.udemy.image_480x270,
      completionRatio: req.body.udemy.completionRatio,
      visible_instructors: req.body.udemy.visible_instructors,
      primary_category: req.body.udemy.primary_category,
    });

    try {
      let c = await course.save();
      const user = await User.findByIdAndUpdate(req.params.idUser, { $push: { courses: (await c)._id } });
    } catch (err) {
      console.log(err);
    }
    trasporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log("email sent");
    });
  });
  app.put("/enrollCourse/:idUser/:idCourse", async function (req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.idUser, { $push: { courses: req.params.idCourse } });
    } catch (err) {
      console.log(err);
    }
    trasporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log("mail sent");
    });
  });
  // app.post("/addcourse", async function (req, res) {
  //   var course = new Courses();
  //   course.title = req.body.title;
  //   course.url = req.body.url;
  //   course.price = req.body.price;
  //   course.isPaid = req.body.isPaid;
  //   course.headline = req.body.headline;
  //   course.rating = req.body.rating;
  //   course.image_480x270 = req.body.image_480x270;
  //   course.completionRatio = req.body.completionRatio;
  //   course.visible_instructors = req.body.visible_instructors;
  //   console.log(course.title);
  //   //res.send(req.body);
  //   try {
  //     var courselog = await course.save();
  //     console.log(courselog);
  //     console.log("added");
  //     res.send("course added");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
  app.get("/blitzcourse/field", async function (req, res, next) {
    try {
      await Course.find.sort({ field: "Front end" });
      res.status(200);
    } catch (error) {
      next(error);
    }
  });
  app.post("/addUdemy", async function (req, res) {
    var course = new Courses();
    course.title = req.body.title;
    course.url = req.body.url;
    course.price = req.body.price_detail.amount;
    course.isPaid = req.body.is_paid;
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
};
