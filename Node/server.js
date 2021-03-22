// importing libraries
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./Auth/auth");
const auth = require("./routes/authRoutes");
const eventRoute = require("./routes/eventRoute");
const profileRoute = require("./routes/profileRoute");
const reclamationRoute = require("./routes/reclamationRoute");
const userRoute = require("./routes/userRoute");
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

//importing routes
dialogflowRoutes = require("./routes/dialogflowRoutes")(app);
userRoutes = require("./routes/userRoute")(app);

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

// Routes
app.use("/api/auth", auth);
app.use("/event", eventRoute);
app.use("/user", userRoute);
app.use("/profile", profileRoute);
app.use("/reclamation", reclamationRoute);