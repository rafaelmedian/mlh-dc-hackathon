import jwt from 'jsonwebtoken';
import { logout } from '../../hoc/withLogout';

const createInitialState = props => ({
  life: 0,
  duration: 0,
  expired: true,
  authenticated: false,
  initialized: false,
  ...props,
});

const types = {
  SET_SESSION: 'SET_SESSION',
  INITIALIZE_SESSION: 'INITIALIZE_SESSION',
  AUTH_USER: 'SESSION_AUTH',
  UNAUTH_USER: 'SESSION_UNAUTH',
  RESET_SESSION: 'RESET_SESSION',
};

const actions = {
  authUser: () => ({ type: types.AUTH_USER, payload: true }),
  initializeSession: () => ({ type: types.INITIALIZE_SESSION, payload: true }),
  setSession: payload => ({ type: types.SET_SESSION, payload }),
  unauthUser: () => ({ type: types.UNAUTH_USER, payload: false }),
  resetSession: () => ({ type: types.RESET_SESSION, payload: createInitialState() }),
};

const selectors = {
  session: state => state.session,
};

const initialState = createInitialState();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.SET_SESSION: {
      return { ...state, ...payload };
    }

    case types.AUTH_USER: {
      return { ...state, ...{ authenticated: true } };
    }

    case types.UNAUTH_USER: {
      return { ...state, ...{ authenticated: false } };
    }

    case types.INITIALIZE_SESSION: {
      return { ...state, ...{ initialized: true } };
    }

    case types.RESET_SESSION: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

/**
 * @param token
 * @returns {{life: number, expired: boolean, duration: number}}
 */
const getSessionTimeLeftInMs = token => {
  const { iat, exp } = jwt.decode(token);
  const duration = (exp - iat);
  const currentTimeInS = Math.floor(Date.now() / 1000);
  const sessionTimeInS = currentTimeInS - iat;
  const life = (duration - sessionTimeInS) * 1000;
  const expired = life <= 0;

  return {
    life, // ms
    expired, //
    duration: duration * 1000, // ms
  }
};

const scanToken = (dispatch, getState, milli) => {
  setInterval(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { life, expired, duration } = getSessionTimeLeftInMs(token);

      if (expired) {
        return logout(dispatch);
      }

      dispatch(actions.setSession({
          life: life * .001,
          expired,
          duration: duration * .001
        }
      ));
    }
  }, milli);
};

export default reducer;

export {
  types,
  actions,
  selectors,
  createInitialState,
  scanToken,
  getSessionTimeLeftInMs,
};
