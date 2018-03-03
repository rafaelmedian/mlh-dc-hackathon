import expect from 'expect';
import reducer, {
  types,
  actions,
  selectors,
  createInitialState,
} from './';

describe('selectors', () => {
  it('should return the correct state', () => {
    const state = {
      user: createInitialState(),
    };
    expect(selectors.user(state)).toEqual(createInitialState());
  });
});

describe('actions', () => {
  it('userLogin()', () => {
    const payload = {
      email: 'webdeveloperpr@gmail.com',
      password: '12345',
    };
    const result = actions.userLogin(payload);
    expect(result).toEqual({
      type: types.USER_LOGIN,
      payload
    })
  });
  it('should return the correct payload', () => {
    const result = actions.reset();
    expect(result).toEqual({
      type: types.USER_RESET,
      payload: createInitialState(),
    })
  });
});

describe('reducer', () => {
  it('should return the correct state when no action matches', () => {
    const initialState = createInitialState();
    const state = reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  it('should return the correct state and not include the password', () => {
    const payload = {
      email: 'webdeveloperpr@gmail.com',
      password: '1234567',
    };
    const state = reducer(createInitialState(), actions.userLogin(payload));
    expect(state).toEqual(createInitialState({ email: 'webdeveloperpr@gmail.com' }));
  });

  it('should reset the user back to it\'s initial state', () => {
    const state = reducer(createInitialState({ name: 'Luis' }), actions.reset());
    expect(state).toEqual(createInitialState());
  });
});
