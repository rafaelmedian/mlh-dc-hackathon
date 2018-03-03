const R = require('ramda');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const JWT_TOKEN_SECRET_KEY = process.env.JWT_TOKEN_SECRET_KEY;

// Creates a valid user.
const createUser = (props = {}) => ({
  email: 'hello@world.com',
  password: '123456',
  firstName: 'Luis',
  lastName: 'Betancourt',
  birthday: new Date('1989-01-26'),
  phone: '+17873737373',
  zip: '00927',
  city: 'Hallandale',
  state: 'Florida',
  country: 'US',
  ...props,
});

function hashPassword() {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(this.password, salt, null, (err, result) => {
      this.password = result;
    })
  });
}

const hashPasswordP = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) reject({ success: false, password: null });
    bcrypt.hash(password, salt, null, (err, hashedPassword) => {
      if (err) reject({ success: false, password: null });
      resolve({ success: true, password: hashedPassword });
    })
  });
});

/**
 * Creates the JWT token used when logging in or registering the user.
 * @param id
 * @param options
 * @returns {*}
 */
const createToken = (id, options = {}) => {
  const tokenOptions = {
    expiresIn: '30m', // minutes
    ...options,
  };

  return jwt.sign({ id }, JWT_TOKEN_SECRET_KEY, tokenOptions);
};

/**
 * Decodes the JWT token
 * @param token
 * @returns {*}
 */
const decodeToken = token => {
  return jwt.decode(token, JWT_TOKEN_SECRET_KEY);
};

/**
 * Verifies a token and makes sure that it is still valid
 * For now we just check that the token is not expired.
 * @param token
 * @returns {*}
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_TOKEN_SECRET_KEY);
  } catch (err) {
    return null;
  }
};

/**
 * Refreshes a JWT token if it is valid.
 * @param oldToken
 * @returns {*}
 */
const refreshToken = (oldToken) => {
  const token = verifyToken(oldToken);
  if (!token) {
    console.log('invalid token');
    return null;
  }

  if (!token.id) {
    console.log('Token does not have an id property');
    return null;
  }

  return createToken(token.id);
};

/**
 * Creates a user with a JWT token and omits the password. This can be used
 * to safely send a response back to the client.
 * @param id
 * @param user
 */
const userWithToken = (id, user) => {
  const token = createToken(id);
  return R.omit(['password'], { ...user, token: token });
};

/**
 * API calls sent when using redux-form expect async formatted like
 * error[prop] = 'error message here'
 * @param err - object with errors
 * @param _error - error message used by redux-form
 */
const formatValidationError = (err, _error = '') => {
  const errors = R.pathOr({}, ['errors'], err);
  const validationErrors = Object
    .keys(errors)
    .reduce((acc, prop) => ({ ...acc, ...{ [prop]: errors[prop].message } }), {});

  return {
    errors: { ...validationErrors, ...{ _error } },
  }
};

module.exports = {
  createUser,
  hashPassword,
  createToken,
  decodeToken,
  userWithToken,
  verifyToken,
  refreshToken,
  formatValidationError,
  hashPasswordP,
  JWT_TOKEN_SECRET_KEY,
};