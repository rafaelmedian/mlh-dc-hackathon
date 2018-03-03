import * as R from 'ramda';
import { SubmissionError } from 'redux-form';

/**
 * Locates the axios errors
 * @param err
 */
const getAxiosErrors = (err) => {
  return R.pathOr({}, ['response', 'data', 'errors'], err);
};

/**
 * Formats the errors in way that redux-form can understand.
 * The object signature is from axios
 * @param err
 */
const throwReduxAsyncErrors = err => {
  throw new SubmissionError(getAxiosErrors(err));
};

export {
  throwReduxAsyncErrors,
}