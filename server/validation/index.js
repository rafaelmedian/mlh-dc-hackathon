const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const countryJs = require('countryjs');

/**
 *  Validates a zipCode
 * @param zip
 * @returns {boolean}
 */
const isZip = zip => (/^\d{5}(?:[-\s]\d{4})?$/.test(zip));

/**
 * Validates a country
 * @param userCountry
 * @returns {boolean}
 */
const isCountry = userCountry => !!countryJs.name(userCountry);

/**
 * @param qty
 * @param prop
 * @returns {boolean}
 */
const minLength = (qty, prop) => !(prop.length < qty);

/**
 *
 * @param qty
 * @param prop
 * @returns {boolean}
 */
const maxLength = (qty, prop) => !(prop.length > qty);

/**
 *
 * @param prop
 * @returns {boolean}
 */
const isEmail = prop => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(prop));

/**
 *
 * @param prop
 * @returns {boolean}
 */
const isPhone = prop => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(prop);
    phoneUtil.isValidNumber(number);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 *
 * @param state
 * @param country
 * @returns {boolean}
 */
const stateInCountry = (state, country) => {
  const states = countryJs.states(country);
  return !!states.find(x => x === state);
};

module.exports = {
  isZip,
  isPhone,
  isEmail,
  isCountry,
  minLength,
  maxLength,
  stateInCountry,
};