const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var User = new Schema({
  userId: Number,
  name: String,
  phone: Number,
  password: String,
  photo: String,
  email: String,
  adress: String,
  role: String,
  age: Number,
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});
module.exports = mongoose.model("User", User);
