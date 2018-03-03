const User = require('../model/User');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { JWT_TOKEN_SECRET_KEY } = require('../model/User/utils');

const options = {
  // seems to work only when lowercased
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_TOKEN_SECRET_KEY,
};

/**
 * Gets the payload or the decoded JWT token, which we use to find a user in the database.
 * @param payload - decoded JWT token
 * @param done (error, user, info)
 */
const authFn = (payload, done) => {
  const userId = payload.id;
  // We want to see if the userID in the payload exists in our database.
  User.findById(userId, (err, user, info) => {
    if (err) {
      return done(err, null);
    }
    if (!user) {
      return done(null, null);
    }

    return done(null, user);
  });
};

passport.use(new JWTStrategy(options, authFn));

/**
 * This is an ugly middleware but it gets the job done.
 * Middleware that validates the JWT and passes the user to the next routes.
 * @param req
 * @param res
 * @param next
 */
const jwtAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) res.send({ errors: { jwt: err } });
    if (!user) res.send({ errors: { jwt: 'Invalid Token' } });
    res.locals.user = user;
    next()
  })(req, res);
};

module.exports = jwtAuth;
