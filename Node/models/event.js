const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Event = new Schema({
  subject: String,
  date: Date,
  location: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
module.exports = mongoose.model("Event", Event);
