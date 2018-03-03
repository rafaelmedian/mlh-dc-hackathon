const {
  isZip,
  isPhone,
  isEmail,
  isCountry,
  minLength,
  maxLength,
  stateInCountry,
} = require('../../../validation');

// Validate properties for the User Model
// All of these properties have access to the model properties via `this`
const phone = [
  {
    validator: isPhone,
    msg: 'Invalid phone'
  },
];

const email = [
  {
    validator: email => minLength(4, email),
    msg: 'Field must have more than 4 characters.'
  },
  {
    validator: email => maxLength(40, email),
    msg: 'Field must have less than 40 characters.'
  },
  {
    validator: isEmail,
    msg: 'Invalid email.'
  },
];

const username = [
  {
    validator: pwd => minLength(4, pwd),
    msg: 'Field must have more than 4 characters.'
  },
  {
    validator: pwd => maxLength(40, pwd),
    msg: 'Field must have less than 40 characters.'
  },
];

const password = [
  {
    validator: pwd => minLength(4, pwd),
    msg: 'Field must have more than 4 characters.'
  },
];

const zipCode = [
  {
    validator: isZip,
    msg: 'Invalid field'
  }
];

const state = [
  {
    validator: function (userState) {
      return stateInCountry(userState, this.country)
    },
    msg: 'Invalid state.',
  }
];

const country = [{
  validator: isCountry,
  msg: 'Invalid country.'
}];

module.exports = {
  username,
  email,
  password,
  phone,
  zipCode,
  state,
  country,
};