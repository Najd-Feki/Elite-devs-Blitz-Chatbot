const mongoose = require("mongoose");
const course = require("./course");
const Schema = mongoose.Schema;
var Profile = new Schema({
  userId: Number,
  education: [
    {
      type: String,
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  hobbies: [
    {
      type: String,
    },
  ],
  informations: [
    {
      type: String,
    },
  ],
  experiences: [
    {
      type: String,
    },
  ],
  courses: [
    {
      type: course,
    },
  ],
});
module.exports = mongoose.model("Profile", Profile);
