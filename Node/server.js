// importing libraries
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./Auth/auth");
const cors = require("cors");
//starting express
const app = express();
app.use(cors());

//connecting to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

//Server configuration
app.use(express.json());
app.listen(5000, () => console.log("Server Started !"));

//DB Status on init
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database !"));

// Express Session
app.use(
  session({
    secret: "very secret this is",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//importing routes
dialogflowRoutes = require("./routes/dialogflowRoutes")(app);
eventRoute = require("./routes/eventRoute")(app); //done
profileRoute = require("./routes/profileRoute")(app); //done
userRoutes = require("./routes/userRoute")(app); //done
reclamationRoute = require("./routes/reclamationRoute")(app);
//******************************************************************rigelha *************************************/
auth = require("./routes/authRoutes")(app);
//***************************************************************wrasek mrigla **********************************/
