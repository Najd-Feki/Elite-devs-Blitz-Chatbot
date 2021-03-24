module.exports = (app) => {
  var express = require("express");
  var router = express.Router();
  const mongoose = require('mongoose');
  const User = require ('../models/user');

// GET all users
  app.get("/user",async function (req, res, next) {
    await User.find(function(err,data) {
      if(err)
      {console.log(err);}
      res.json(data)
    });
  });

// GET user by id
  app.get("/user/:id",async function (req, res, next) {
    var id = req.params.id;
    await User.findById(id,function(err,data) {
      if (err)
      { console.log(err);}
      res.json(data);
    })
  });

// add user 
    app.post('/user/add',async function (req, res) {
      var user = new User();
      user.userName = req.body.userName;
      user.password = req.body.password;
      user.email = req.body.email;
      user.photo = req.body.photo;
      user.role = req.body.role;
      user.events = req.body.events;
      user.third_party_auth = req.body.third_party_auth;
      user.date = req.body.date;
      try
      {var userlog = await user.save();
      console.log(userlog);
      res.send("user added")}
      catch(err)
      {console.log(err);}
    });

// delete user
app.delete('/user/delete/:id',async function (req, res) {
  var id = req.params.id;
  await User.findByIdAndRemove(id,function(err,doc) {
    if (err)
    { console.log(err);}
    res.send("user removed");
  })
});    

// modify user 
app.put('/user/modify/:id',async function (req, res) {
  var id = req.params.id;
  await User.findByIdAndUpdate(id,{$set:req.body},function(err,doc) {
    if (err)
    { console.log(err);}
    res.send("user updated");
    console.log(doc);
  })
});
};
