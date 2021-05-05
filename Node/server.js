require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./Auth/auth");
const cors = require("cors");
const Routes = require("./routes/course.js");
const bodyParser = require("body-parser");
//starting express
const app = express();

var router = express.Router();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
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
app.listen(process.env.PORT || 5000, () => console.log("Server Started !"));

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

/* // Passport middleware
app.use(passport.initialize());
app.use(passport.session()); */

//courses

app.use("/course", Routes);

//importing routes
dialogflowRoutes = require("./routes/dialogflowRoutes")(app);
eventRoute = require("./routes/eventRoute")(app); //done
profileRoute = require("./routes/profileRoute")(app); //done
userRoutes = require("./routes/userRoute")(app); //done
reclamationRoute = require("./routes/reclamationRoute")(app);
courses = require("./routes/courses")(app);
Admincourse = require("./routes/AdminCourse")(app);
pdfResumeRoute = require("./routes/pdfResumeRoute")(app);
CourseRec = require("./routes/CourseRec")(app);
//*************************************************************** auth-phase 2 **********************************/ // Init Middleware
//******************************************************************rigelha *************************************/
/* auth = require('./routes/authRoutes')(app);
 */

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
