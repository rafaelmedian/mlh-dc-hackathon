const {
  createToken,
  decodeToken,
  verifyToken,
  refreshToken,
  formatValidationError,
  hashPasswordP
} = require('./utils');
const mongoose = require('mongoose');
const MongooseError = mongoose.Error;

describe('creates a JWT', () => {
  it('create a web token', () => {
    const token = createToken('123');
    const { id } = decodeToken(token);
    expect(id).to.equal('123');
  });

  it('verify an invalid token', () => {
    const token = createToken('123', { expiresIn: 0 });
    const result = verifyToken(token);
    expect(result).to.equal(null);
  });

  it('verify a valid token', () => {
    const token = createToken('123');
    const decodedToken = decodeToken(token);
    const result = verifyToken(token);
    expect(result).to.deep.equal(decodedToken);
  });

  it('refreshes a token', done => {
    const time = 1000; // 1 sec
    const oldToken = createToken('123');
    const { iat: oldIat } = decodeToken(oldToken);

    setTimeout(() => {
        const newToken = refreshToken(oldToken);
        const { iat: newIat } = decodeToken(newToken);
        expect(oldIat).to.not.equal(newIat);
        expect(typeof oldIat === 'number');
        expect(typeof newIat === 'number');
        done();
      },
      time);
  });

  it('should format redux form errors', () => {
    const error = {
      errors: {
        email: new MongooseError.ValidatorError({
          message: 'Invalid email',
          kind: 'custom error',
          path: 'email',
          value: '',
          reason: 'This is a test error',
        }),
        password: new MongooseError.ValidatorError({
          message: 'Invalid password',
          kind: 'custom error',
          path: 'password',
          value: '',
          reason: 'This is a test error',
        })
      },
    };
    const result = formatValidationError(error, 'Error creating user');
    expect(result).to.deep.equal({
      errors: {
        _error: 'Error creating user',
        email: 'Invalid email',
        password: 'Invalid password',
      }
    })
  });

  it('should hash a password using promise API', done => {
    hashPasswordP('hello')
      .then(({ success }) => {
        expect(success).to.equal(true);
        done()
      })
  });
});