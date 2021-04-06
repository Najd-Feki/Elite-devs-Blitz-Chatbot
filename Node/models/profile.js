const mongoose = require("mongoose");
const course = require("./course");
const Schema = mongoose.Schema;
var Profile = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  age: Number,
  phone: String,
  email: String,
  education: String,
  academicProject: String,
  address: String,
  linkedIn: String,
  github: String,
  softSkills: [String],
  hardSkills: [String],
  hobbies: [String],
  languages: [String],
  experiences: [String],
  courses: [
    String,
    //{type: mongoose.Schema.Types.ObjectId, ref: "Course",},
  ],
  creationDate: { type: Date, value: Date.now },
});
module.exports = mongoose.model("Profile", Profile);
