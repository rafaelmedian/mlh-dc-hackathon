import React from 'react';
import * as R from 'ramda';
import { reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { forgetPassword } from '../../../api/users';
import InputField from '../../../components/Form/InputField/index';
import { validateForgetPassword } from '../../../utils/form/validation/index';

// [x] initial values
// [x] validation
// [x] sync errors
// [x] api call
// [ ] async errors
// [ ] routing
// [ ] handle onSubmit

const ForgetPassword = props => {
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
      <input type="submit" />
      <Link to="/login">Login</Link>
    </form>
  );
};

const formOptions = {
  form: 'forgetPassword',
  onSubmit: forgetPassword,
  validate: validateForgetPassword,
  initialValues: {
    email: '',
  }
};

export default R.compose(
  withRouter,
  reduxForm(formOptions)
)(ForgetPassword);

