const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Course = new Schema({
  title: String,
  url: String,
  price: String,
  isPaid: Boolean,
  headline: String,
  rating: String,
  visible_instructors: [Schema.Types.Mixed],
  image_480x270: String,
  completionRatio: Number,
});
module.exports = mongoose.model("Course", Course);
