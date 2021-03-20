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
  third_party_auth: [ThirdPartyProviderSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", User);
