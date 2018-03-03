import expect from 'expect';
import reducer, {
  types,
  actions,
  selectors,
  initialState,
} from './';

describe('initialState', () => {
  it('should have the correct initial state', () => {
    expect(initialState).toEqual({ referrer: '', });
  });
});

describe('selectors', () => {
  it('should return the correct state', () => {
    const state = { location: initialState };
    expect(selectors.location(state)).toEqual(initialState);
  });
});

describe('actions', () => {
  it('should return the correct payload', () => {
    const payload = '/hello';
    const result = actions.setReferrer(payload);
    expect(result).toEqual({
      type: types.SET_REFERRER,
      payload
    })
  });
});

describe('reducer', () => {
  it('should return the correct state when no action matches', () => {
    const state = reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  it('should return the correct state and not include the password', () => {
    const payload = 'hello-world';
    const state = reducer(initialState, actions.setReferrer(payload));
    expect(state).toEqual({ referrer: 'hello-world' });
  });
});

