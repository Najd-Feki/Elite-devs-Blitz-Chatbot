const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Event = new Schema({
  subject: String,
  date: Date,
  location: String,
});
module.exports = mongoose.model("Event", Event);
