const User = require('./index');
const { createUser } = require('./utils');
const { createChars } = require('../../../validation/utils');

describe('email', () => {
  it('unique', (done) => {
    new User({ email: 'webdeveloperpr@gmail.com', password: '12345' })
      .save()
      .then(() => {
        new User({ email: 'webdeveloperpr@gmail.com', password: '12345' })
          .save()
          .then(() => {
            done();
          }).catch(err => {
          expect(err.errors.email.message).to.equal('webdeveloperpr@gmail.com is already taken.');
          done();
        });
      })
  });
  it('minLength', (done) => {
    new User({ email: '1' })
      .save()
      .catch(err => {
        expect(err.errors.email.message).to.equal('Field must have more than 4 characters.');
        done();
      });
  });
  it('maxLength', (done) => {
    new User({ email: createChars(41) })
      .save()
      .catch(err => {
        expect(err.errors.email.message).to.equal('Field must have less than 40 characters.');
        done();
      });
  });
  it('isEmail', (done) => {
    new User({ email: 'lala@gmai' })
      .save()
      .catch(err => {
        expect(err.errors.email.message).to.equal('Invalid email.');
        done();
      });
  });
});

describe('password', () => {
  it('minLength', (done) => {
    new User({ password: '1' })
      .save()
      .catch(err => {
        expect(err.errors.password.message).to.equal('Field must have more than 4 characters.');
        done();
      });
  });
});

describe('username', () => {
  it('unique', (done) => {
    new User({ email: 'webdeveloperpr@gmail.com', password: '12345' })
      .save()
      .then(() => {
        new User({ email: 'webdeveloperpr@gmail.com', password: '12345' })
          .save()
          .then(() => {
            done();
          }).catch(err => {
          expect(err.errors.email.message).to.equal('webdeveloperpr@gmail.com is already taken.');
          done();
        });
      })
  });
  it('minLength', (done) => {
    new User({ username: '1' })
      .save()
      .catch(err => {
        expect(err.errors.username.message).to.equal('Field must have more than 4 characters.');
        done();
      });
  });
  it('maxLength', (done) => {
    new User({ username: createChars(41) })
      .save()
      .catch(err => {
        expect(err.errors.username.message).to.equal('Field must have less than 40 characters.');
        done();
      });
  });
});

describe('phone', () => {
  it('isPhone', (done) => {
    new User(createUser({ phone: '+00787-763-3541' }))
      .save()
      .catch(err => {
        expect(err.errors.phone.message).to.equal('Invalid phone');
        done();
      });
  });
  it('isPhone', (done) => {
    new User(createUser({ phone: '' }))
      .save()
      .catch(err => {
        expect(err.errors.phone.message).to.equal('Invalid phone');
        done();
      });
  });
  it('isPhone', (done) => {
    new User(createUser({ phone: '7877878787' }))
      .save()
      .catch(err => {
        expect(err.errors.phone.message).to.equal('Invalid phone');
        done();
      });
  });
  it('isPhone', (done) => {
    new User(createUser({ phone: '+17877878787' }))
      .save()
      .then((user) => {
        expect(user.phone).to.equal('+17877878787');
        done();
      });
  });
});

describe('zip', () => {
  it('required', done => {
    // noinspection JSAnnotator
    new User(createUser({ zipCode: 00927 }))
      .save()
      .catch(err => {
        expect(err.errors.zipCode.message).to.equal('Invalid field');
        done();
      });
  });
  it('required', done => {
    new User(createUser({ zipCode: '00927' }))
      .save()
      .then(user => {
        expect(user.zipCode).to.equal('00927');
        done();
      });
  });
});

describe('state', () => {
  it('stateInCountry', done => {
    new User(createUser({ country: 'US', state: 'Puerto Rico' }))
      .save()
      .catch(err => {
        expect(err.errors.state.message).to.equal('Invalid state.');
        done();
      });
  });
  it('stateInCountry', done => {
    new User(createUser({ country: 'US', state: 'Florida' }))
      .save()
      .then(user => {
        expect(user.state).to.equal('Florida');
        done();
      })
  });
  it('stateInCountry', done => {
    new User(createUser({ country: '', state: 'Florida' }))
      .save()
      .catch(err => {
        expect(err.errors.state.message).to.equal('Invalid state.');
        done();
      });
  });
  it('stateInCountry', done => {
    new User(createUser({ country: 'CA', state: 'Nunavut' }))
      .save()
      .then(user => {
        expect(user.state).to.equal('Nunavut');
        done();
      });
  });
});

describe('country', () => {
  it('country', done => {
    new User(createUser({ country: '' }))
      .save()
      .catch(err => {
        expect(err.errors.country.message).to.equal('Invalid country.');
        done();
      });
  });
  it('country', done => {
    new User(createUser({ country: 'wer' }))
      .save()
      .catch(err => {
        expect(err.errors.country.message).to.equal('Invalid country.');
        done();
      });
  });
});
