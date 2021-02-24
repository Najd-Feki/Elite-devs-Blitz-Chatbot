// importing libraries
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//starting express
const app = express();

//connecting to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//Server configuration
app.use(express.json());
app.listen(3000, () => console.log("Server Started !"));

//DB Status on init
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database !"));