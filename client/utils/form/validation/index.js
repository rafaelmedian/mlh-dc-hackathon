const ERROR_REQUIRED = 'required';

const email = ({ value, name }) => (errors = {}) => {
  if (!value) {
    errors[name] = ERROR_REQUIRED;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    errors[name] = 'Invalid email address'
  }

  return errors;
};

const password = ({ value, name }) => (errors = {}) => {
  if (!value) {
    errors[name] = ERROR_REQUIRED;
  } else if (value.length < 4) {
    errors[name] = 'Must be 4 characters or more'
  } else if (value.length > 15) {
    errors[name] = 'Must be 15 characters or less'
  }

  return errors;
};

const confirmPassword = (password, confirmPassword, names = []) => errors => {
  if (password !== confirmPassword) {
    names.forEach(name => errors[name] = 'Passwords must match');
  }

  return errors;
};

export const validateRegistration = values => {
  return [
    email({ value: values.email, name: 'email' }),
    password({ value: values.password, name: 'password' }),
    password({ value: values.confirmPassword, name: 'confirmPassword' }),
    confirmPassword(values.password, values.confirmPassword, ['password', 'confirmPassword'])
  ].reduce((errors, fn) => fn(errors), {});
};

export const validateResetPassword = values => {
  return [
    password({ value: values.confirmPassword, name: 'confirmPassword' }),
    confirmPassword(values.password, values.confirmPassword, ['password', 'confirmPassword'])
  ].reduce((errors, fn) => fn(errors), {});
};

export const validateLogin = values => {
  return [
    email({ value: values.email, name: 'email' }),
    password({ value: values.password, name: 'password' }),
  ].reduce((errors, fn) => fn(errors), {});
};

export const validateForgetPassword = values => {
  return [
    email({ value: values.email, name: 'email' }),
  ].reduce((errors, fn) => fn(errors), {});
};
