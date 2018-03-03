import expect from 'expect';
import reducer, {
  types,
  actions,
  selectors,
  initialState,
} from './';

describe('initialState', () => {
  it('should have the correct initial state', () => {
    expect(initialState).toEqual({
      authenticated: false,
    });
  });
});

describe('selectors', () => {
  it('should return the correct state', () => {
    const state = {
      auth: initialState
    };
    expect(selectors.auth(state)).toEqual(initialState);
  });
});

describe('actions', () => {
  it('should return authenticate a user', () => {
    const result = actions.authUser();
    expect(result).toEqual({
      type: types.AUTH_USER,
      payload: true,
    })
  });

  it('should unauthenticate a user', () => {
    const result = actions.unauthUser();
    expect(result).toEqual({
      type: types.UNAUTH_USER,
      payload: false,
    })
  });
});

describe('reducer', () => {
  it('should return the correct state when no action matches', () => {
    const state = reducer(initialState, {});
    expect(state).toEqual(initialState);
  });
});

