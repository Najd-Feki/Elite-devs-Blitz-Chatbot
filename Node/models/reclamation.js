const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Reclamataion = new Schema({
  userId: Number,
  type: String,
  date: {
    type: Date,
    default: Date.now,
  },
  description: String,
});
module.exports = mongoose.model("Reclamation", Reclamation);
