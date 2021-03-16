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

// const { WebhookClient } = require("dialogflow-fulfillment");
// const { welcome, defaultFallback, Name } = require("./intents/intents");
// app.post("/dialogflow", express.json(), (req, res) => {
//   const agent = new WebhookClient({ request: req, response: res });
//   let intentMap = new Map();
//   //intentMap.set("Default Welcome Intent", welcome);
//   //intentMap.set("Default Fallback Intent", defaultFallback);
//   //intentMap.set("Name");
//   agent.handleRequest(intentMap);
//   console.log(req.body.queryResult.parameters);
// });
app.get("/", (req, res) => {
  console.log("hello");
  res.send("Hello");
});

//importing routes
dialogflowRoutes = require("./routes/dialogflowRoutes")(app);
