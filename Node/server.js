// importing libraries
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./Auth/auth');
const auth = require('./routes/authRoutes');
const eventRoute = require('./routes/eventRoute');
const profileRoute = require('./routes/profileRoute');
const reclamationRoute = require('./routes/reclamationRoute');
const userRoute = require('./routes/userRoute');
//starting express
const app = express();

//connecting to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//Server configuration
app.use(express.json());
<<<<<<< HEAD
app.listen(5000, () => console.log("Server Started !"));
=======
app.listen(3000, () => console.log('Server Started !'));
>>>>>>> 0a448025d6595d0f19e511d2f5dde191a05ad877

//DB Status on init
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database !'));

//importing routes
<<<<<<< HEAD
dialogflowRoutes = require("./routes/dialogflowRoutes")(app);
userRoutes = require("./routes/userRoutes")(app);
=======
dialogflowRoutes = require('./routes/dialogflowRoutes')(app);
userRoutes = require('./routes/userRoute')(app);
>>>>>>> 0a448025d6595d0f19e511d2f5dde191a05ad877

// Express Session
app.use(
  session({
    secret: 'very secret this is',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
<<<<<<< HEAD
app.get("/", (req, res) => {
  console.log("helloooo");
  res.send("Welcome to elite devs !");
});
auth = require("./routes/authRoutes")(app);
linkedIn = require("./routes/linkedInRoutes")(app);
=======
app.use('/api/auth', auth);
app.use('/event', eventRoute);
app.use('/user', userRoute);
app.use('/profile', profileRoute);
app.use('/reclamation', reclamationRoute);
>>>>>>> 0a448025d6595d0f19e511d2f5dde191a05ad877
