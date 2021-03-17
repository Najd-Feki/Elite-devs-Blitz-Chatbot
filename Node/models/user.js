const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var User = new Schema({
  userId: Number,
  userName: String,
  password: String,
  photo: String,
  role: String,
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});
module.exports = mongoose.model("User", User);
