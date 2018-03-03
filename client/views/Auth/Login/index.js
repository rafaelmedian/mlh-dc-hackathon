import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../../api/users';
import InputField from '../../../components/Form/InputField/index';
import { validateLogin } from '../../../utils/form/validation/index';
import withOnLoginSuccess from '../../../hoc/withOnLoginSuccess/index';

const FacebookLogin = () => {};

const Login = props => {
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
      <input type="submit" />
      <Link to="/register">Register</Link>
      <Link to="/forget-password">Forget password?</Link>
    </form>
  );
};

const mapStateToProps = state => ({ referrer: state.location.referrer });

const formOptions = {
  form: 'login',
  onSubmit: login,
  validate: validateLogin,
  initialValues: {
    email: 'webdeveloperpr@gmail.com',
    password: '123qweQWE',
  }
};

export default R.compose(
  withRouter,
  connect(mapStateToProps),
  withOnLoginSuccess,
  reduxForm(formOptions),
)(Login);
