const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Course = new Schema({
  courseId: Number,
  title: String,
  url: String,
  price: Number,
  isPaid: Boolean,
  photo: String,
  instructorName: String,
  instructorTitle: String,
  instructorImage: String,
});
module.exports = mongoose.model("Course", Course);
