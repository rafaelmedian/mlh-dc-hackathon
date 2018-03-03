import React from 'react';
import * as R from 'ramda';
import { reduxForm } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { register } from '../../../api/users';
import InputField from '../../../components/Form/InputField/index';
import withOnLoginSuccess from '../../../hoc/withOnLoginSuccess/index';
import { validateRegistration } from '../../../utils/form/validation/index';

const Register = props => {
  const { handleSubmit, onSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <InputField
          name="email"
          type="text"
        />
      </div>
      <div>
        <label>Password:</label>
        <InputField
          name="password"
          type="password"
        />
      </div>
      <div>
        <label>Confirm password:</label>
        <InputField
          name="confirmPassword"
          type="password"
        />
      </div>
      <input type="submit" />
      <Link to="/login">Login</Link>
    </form>
  );
};

const formOption = {
  form: 'register',
  onSubmit: register,
  validate: validateRegistration,
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
  }
};

export default R.compose(
  withRouter,
  withOnLoginSuccess,
  reduxForm(formOption)
)(Register);
