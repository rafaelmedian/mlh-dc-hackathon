import { api }  from './config';
import { throwReduxAsyncErrors } from './utils';

const register = data => {
  return api
    .post('/api/register', data)
    .catch(throwReduxAsyncErrors);
};

const login = data => {
  return api
    .post('/api/login', data)
    .catch(throwReduxAsyncErrors);
};

const forgetPassword = data => {
  return api
    .post('/api/forget-password', data)
    .catch(throwReduxAsyncErrors);
};

const resetPassword = data => {
  return api
    .post('/api/reset-password', data)
    .catch(throwReduxAsyncErrors);
};

const refreshToken = () => {
  return api
    .post('/api/refresh-token', {})
    .catch(err => {
      throw new Error(err);
    });
};

export {
  // auth
  login,
  register,
  refreshToken,
  resetPassword,
  forgetPassword,
}
