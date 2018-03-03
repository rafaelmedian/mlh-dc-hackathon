const nodemailer = require('nodemailer');
const transportObj = {
  service: process.env.EMAIL_SERVICE,
  auth: { user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_PASSWORD }
};
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// str -> bool
const isEmail = email => EMAIL_REGEX.test(email);
// str -> bool
const stringHasLength = str => str.length > 0;
// str -> bool
const isString = str => typeof str === 'string';
// str -> fn(str) -> bool
const fnReturnsTrue = val => fn => fn(val) === true;
// obj -> fn(str) -> bool
const errorIsEmpty = errors => key => errors[key] === '';
// array[fn] -> any
const allTrue = (fns, x) => [].concat(fns).every(fnReturnsTrue(x));
// str -> bool
const validFrom = x => allTrue([isString, stringHasLength, isEmail], x);
// str -> bool
const validTo = x => allTrue([isString, stringHasLength, isEmail], x);
// str -> bool
const validSubject = x => allTrue([isString, stringHasLength], x);
// str -> bool
const validText = x => allTrue([isString, stringHasLength], x);
// obj -> bool
const isValid = errors => Object.keys(errors).every(errorIsEmpty(errors));
// (fn, any, any) -> any
const ifOr = (fn, x, y) => fn(x) ? x : y;
// any -> str
const isStrOrEmptyStr = x => ifOr(validText, x, '');
// obj -> obj
const createErrorObj = (x = {}) => ({
  from: isStrOrEmptyStr(x.from),
  to: isStrOrEmptyStr(x.to),
  subject: isStrOrEmptyStr(x.subject),
  html: isStrOrEmptyStr(x.html)
});
// obj -> obj
const createEmailObj = (x = {}) => ({
  from: isStrOrEmptyStr(x.from),
  to: isStrOrEmptyStr(x.to),
  subject: isStrOrEmptyStr(x.subject),
  html: isStrOrEmptyStr(x.html)
});

// obj -> obj
const validateEmailRequest = (mailOptions = {}) => {
  let errors = createErrorObj();
  const { from, to, subject, html } = mailOptions;

  if (!validFrom(from)) errors.from = 'from: Invalid e-mail';
  if (!validTo(to)) errors.to = 'to: Invalid e-mail';
  if (!validSubject(subject)) errors.subject = 'subject: Invalid subject';
  if (!validText(html)) errors.html = 'html: Invalid html';

  return {
    isValid: isValid(errors),
    errors,
    mailOptions,
  }
};

// Why is next required?
function sendEmail(user, req, res, next) {
  const recoveryToken = user.token;
  const options = {
    from: 'techSupport@webdeveloperpr.com',
    to: 'webdeveloperpr@gmail.com',
    html: '<p>Click <a href="http://localhost:3000/reset-password/' + recoveryToken + '">here</a> to reset your password</p>',
    subject: 'my-site.com password reset',
  };

  const { isValid, errors, mailOptions } = validateEmailRequest(options);

  // do validations
  if (!isValid) {
    return res
      .status(400)
      .send({ errors });
  }

  const transporter = nodemailer.createTransport(transportObj);

  transporter.sendMail(mailOptions, function (error) {
    if (!error) {
      console.log('Email Sent!: ');
      return res.status(200).send({ message: 'Email Sent!' });
    }

    console.log('Email Failed to send!: ', error);
    return res.status(400).json({ message: error });
  });
}

module.exports = {
  isEmail,
  sendEmail,
  stringHasLength,
  fnReturnsTrue,
  errorIsEmpty,
  allTrue,
  validFrom,
  isString,
  validTo,
  validSubject,
  validText,
  isValid,
  isStrOrEmptyStr,
  createEmailObj,
  validateEmailRequest,
};
