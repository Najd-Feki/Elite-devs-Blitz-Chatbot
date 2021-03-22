const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/register_login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: 'No user found' });
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
app.get(
  '/google',
  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' })
);

// GET /auth/google/callback
app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);

module.exports = router;
