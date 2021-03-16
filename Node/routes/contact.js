var express = require("express");
const { route } = require(".");
var router = express.Router();
var Contact = require("../models/contact");
/* GET contact page. */
router.get("/", function (req, res) {
  Contact.find(function (err, data) {
    res.json(data);
  });
});
/* POST contact page */
router.post("/add", function (req, res) {
  new Contact({ FullName: req.body.FullName, Phone: req.body.Phone }).save();
  res.send("Added");
});

/*Delete contact */
router.post("/delete/:id", function (req, res, next) {
  Contact.findByIdAndRemove(req.params.id, function (err, docs) {
    if (err) console.log(err);
    res.send("contact deleted");
  });
});
module.exports = router;
