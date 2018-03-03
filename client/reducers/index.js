import session from './session'
import user from './user'
import location from './location'
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'react-router-redux'

export default combineReducers({
  user,
  form,
  router,
  session,
  location,
});
