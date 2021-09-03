var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');
            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);
              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');
              res.cookie('access-token',token, { maxAge: 900000, httpOnly: true });
              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

router.post('/signup', passport.authenticate('signup', { session: false }), async function (req, res, next) {
  res.send('Signup success');
});

module.exports = router;
// passport.authenticate('signup', { session: false })