import React from 'react';
import { actions as userActions } from '../../reducers/user';
import { actions as sessionActions } from '../../reducers/session';

const handleLoginSuccess = (payload, dispatch, { history, referrer }) => {
  localStorage.setItem('token', payload.data.token);
  dispatch(userActions.userLogin(payload.data));
  dispatch(sessionActions.authUser());
  history.push(referrer);
};

// To be used on a redux-form after a successful submit
const withOnLoginSuccess = Component => props => {
  return (
    <Component
      onSubmitSuccess={handleLoginSuccess}
      {...props}
    />
  );
};

export { handleLoginSuccess };
export default withOnLoginSuccess;