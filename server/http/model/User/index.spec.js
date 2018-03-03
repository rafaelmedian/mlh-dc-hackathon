const User = require('.');
const { createUser } = require('./utils');

describe('User Model', () => {
  it('Create a user', done => {
    const user1 = createUser();
    new User(user1)
      .save()
      .then(() => {
        User
          .findOne({ email: 'hello@world.com' })
          .then(user => {
            expect(user.name).to.equal(user1.name);
            done();
          })
      })
      .catch(err => {
        done()
      })
  });
});

describe('User virtual properties', () => {
  it('should have an age property', done => {
    const user1 = createUser();
    new User(user1)
      .save()
      .then(() => {
        User
          .findOne({ email: 'hello@world.com' })
          .then(user => {
            expect(user.age).to.equal(29);
            done();
          })
      })
  });
});