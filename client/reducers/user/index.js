import * as R from 'ramda';

const createInitialState = props => ({
  _id: '',
  city: '',
  state: '',
  email: '',
  phone: '',
  country: '',
  zipCode: '',
  birthday: '',
  lastName: '',
  username: '',
  firstName: '',
  createdAt: '',
  updatedAt: '',
  ...props,
});

const mergeMatchingProps = (state = {}, payload = {}) => {
  const keys = R.keys(state);
  const matchingPayloadProps = R.pick(keys, payload);
  return R.mergeDeepLeft(matchingPayloadProps, state);
};

const types = {
  USER_LOGIN: 'USER_LOGIN',
  USER_RESET: 'USER_RESET'
};

const actions = {
  userLogin: payload => ({ type: types.USER_LOGIN, payload }),
  reset: () => ({ type: types.USER_RESET, payload: createInitialState() }),
};

const selectors = {
  user: state => state.user,
};

const initialState = createInitialState();

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.USER_LOGIN: {
      return mergeMatchingProps(state, payload);
    }

    case types.USER_RESET: {
      return payload;
    }

    default: {
      return state;
    }
  }
};

export {
  types,
  actions,
  selectors,
  createInitialState,
};

export default reducer;
