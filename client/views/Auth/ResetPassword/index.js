import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { resetPassword } from '../../../api/users';
import InputField from '../../../components/Form/InputField/index';
import withOnLoginSuccess from '../../../hoc/withOnLoginSuccess/index';
import { validateResetPassword } from '../../../utils/form/validation/index';

// [x] initial values
// [x] validation
// [x] sync errors
// [x] api call
// [ ] async errors
// [x] routing

const ResetPassword = props => {
  const { handleSubmit, onSubmit, match } = props;
  const { token } = match.params;

  // [x] Send the password along with the token
  // [x] If the token the response is ok reset the password.
  // [x] set the new token.
  // [x] and login the user.

  const _onSubmit = props => onSubmit({ ...props, token });

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <div>
        <label>Password:</label>
        <InputField
          name="password"
          type="password"
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <InputField
          name="confirmPassword"
          type="password"
        />
      </div>
      <input type="submit" />
    </form>
  );
};

const formOptions = {
  form: 'resetPassword',
  onSubmit: resetPassword,
  validate: validateResetPassword,
  initialValues: {
    password: '',
    confirmPassword: '',
  }
};

export default R.compose(
  withRouter,
  connect(null, null),
  reduxForm(formOptions),
  withOnLoginSuccess,
)(ResetPassword);
