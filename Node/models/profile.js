const mongoose = require("mongoose");
const course = require("./course");
const Schema = mongoose.Schema;
var Profile = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contacts: String,
  personal: String,
  headline: String,
  summary: String,
  name: String,
  age: Number,
  phone: String,
  email: String,
  education: String,
  academicProject: String,
  address: String,
  website: String,
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
  interests: String,
  positions: String,
  creationDate: { type: Date, value: Date.now },
  awards: String,
  socialProfiles: String,
});
module.exports = mongoose.model("Profile", Profile);
