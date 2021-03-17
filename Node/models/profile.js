const mongoose = require("mongoose");
const course = require("./course");
const Schema = mongoose.Schema;
var Profile = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
module.exports = mongoose.model("Profile", Profile);
