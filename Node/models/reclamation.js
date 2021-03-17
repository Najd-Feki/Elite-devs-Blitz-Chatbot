const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Reclamation = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: String,
  date: {
    type: Date,
    default: Date.now,
  },
  description: String,
});
module.exports = mongoose.model("Reclamation", Reclamation);
