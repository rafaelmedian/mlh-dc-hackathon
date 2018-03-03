import { validateRegistration } from './';

const hasErrors = x => !!Object.keys(x).length;
const validEmail = 'webdeveloperpr@gmail.com';
const validPassword = '23456';
const inValidPassword = '2';

describe('Validate Registration', () => {
  it('should not return error when passwords match', () => {
    const errors = validateRegistration({
      email: validEmail,
      password: validPassword,
      confirmPassword: validPassword
    });
    expect(hasErrors(errors)).toBe(false);
  });

  it('should return error when passwords do not match', () => {
    const errors = validateRegistration({
      email: validEmail,
      password: '',
      confirmPassword: inValidPassword
    });
    expect(hasErrors(errors)).toBe(true);
  });

  it('should return error when email is empty', () => {
    const errors = validateRegistration({
      email: '',
      password: '123',
      confirmPassword: '1234'
    });
    expect(hasErrors(errors)).toBe(true);
  });
});