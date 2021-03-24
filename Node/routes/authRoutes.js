module.exports = (app) => {
  // var express = require("express");
  // var router = express.Router();
  const passport = require("passport");
  app.post("/register_login", (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      if (!user) {
        return res.status(400).json({ errors: "No user found" });
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.status(400).json({ errors: err });
        }
        return res.status(200).json({ success: `logged in ${user.id}` });
      });
    })(req, res, next);
  });

// GET /auth/google
app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// GET /auth/google/callback
app.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
  res.redirect("/");
});
// GET /auth/Facebook
app.get("/facebook", passport.authenticate("facebook"), {
  scope: ["profile", "email"],
});
app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// GET /auth/Twitter
app.get("/twitter", passport.authenticate("twitter"));
app.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
};
