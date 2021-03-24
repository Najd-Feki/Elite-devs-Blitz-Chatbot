module.exports = (app) => {
  var express = require("express");
  var router = express.Router();
  const mongoose = require('mongoose');
  const Profile = require ('../models/profile');
// GET all profile
  app.get("/profile",async function (req, res, next) {
  await  Profile.find(function(err,data) {
      if(err)
      {console.log(err);}
      res.json(data)
    });
  });

// GET profile by id
  app.get("/profile/:id",async function (req, res, next) {
    var id = req.params.id;
    await Profile.findById(id,function(err,data) {
      if (err)
      { console.log(err);}
      res.json(data);
    })
  });

// add profile 
    app.post('/profile/add',async function (req, res) {
      var profile = new Profile();
      profile.age = req.body.age;
      profile.phone = req.body.phone;
      profile.email = req.body.email;
      profile.education = req.body.education;
      profile.academicProject = req.body.academicProject;
      profile.address = req.body.address;
      profile.linkedIn = req.body.linkedIn;
      profile.github = req.body.github;
      profile.softSkills = req.body.softSkills;
      profile.hardSkills = req.body.hardSkills;
      profile.hobbies = req.body.hobbies;
      profile.languages = req.body.languages;
      profile.experiences = req.body.experiences;
      profile.courses = req.body.courses;
      profile.creationDate = req.body.creationDate;
      try
      {var profilelog = await profile.save();
      console.log(profilelog);
      res.send("profile added")}
      catch(err)
      {console.log(err);}
    });

// delete profile
app.delete('/profile/delete/:id',async function (req, res) {
  var id = req.params.id;
  await Profile.findByIdAndRemove(id,function(err,doc) {
    if (err)
    { console.log(err);}
    res.send("profile removed");
  })
});    

// modify profile 
app.put('/profile/modify/:id',async function (req, res) {
  var id = req.params.id;
  await Profile.findByIdAndUpdate(id,{$set:req.body},function(err,doc) {
    if (err)
    { console.log(err);}
    res.send("profile updated");
    console.log(doc);
  })
});
};