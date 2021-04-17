const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ThirdPartyProviderSchema = new Schema({
  provider_name: {
    type: String,
    default: null,
  },
  provider_id: {
    type: String,
    default: null,
  },
  provider_data: {
    type: {},
    default: null,
  },
});

var User = new Schema({
  userName: String,
  password: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: String,
  role: String,
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  third_party_auth: [ThirdPartyProviderSchema],
  date: {
    type: Date,
    default: Date.now,
  },
  loginDates: [Date],
});
module.exports = mongoose.model("User", User);
