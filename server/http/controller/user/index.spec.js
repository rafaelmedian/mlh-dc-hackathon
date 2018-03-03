const request = require('supertest');
const User = require('../../model/User/index');
const app = require('../../../app');
const { createUser, decodeToken } = require('../../model/User/utils');

describe('UsersController', () => {
  it('should POST to /api/register', done => {
    const user = createUser();
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        const { username, password, token } = res.body;
        expect(username).to.equal(user.username);
        // we don't send the hashed password back
        expect(password).to.equal(undefined);
        expect(token).to.exist;
        done();
      });
  });

  it('should POST to /api/login and receive a valid token', done => {
    const user = createUser();
    const { email, password } = createUser();
    // register the user
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        // local login the user
        request(app)
          .post('/api/login')
          .send({ email, password })
          .end((err, res) => {
            const { _id, token } = res.body;
            const decodedToken = decodeToken(token);
            expect(decodedToken.id).to.equal(_id);
            done();
          });
      });
  });

  it('should GET to /api/users and receive a valid token', done => {
    const user = createUser();
    const { email, password } = createUser();
    // register the user
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        request(app)
          .get('/api/users')
          .set({ Authorization: res.body.token })
          .send({ email, password })
          .end((err, res) => {
            expect(res.body.length).to.equal(1);
            done();
          });
      });
  });

  it('should GET to /api/users/:id', done => {
    const user = createUser();
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        const { _id } = res.body;
        request(app)
          .get(`/api/users/${_id}`)
          .send(user)
          .end((err, res) => {
            expect(res.body._id).to.equal(_id);
            done();
          });
      });
  });

  it('should GET to /api/refresh-token', done => {
    const user = createUser();

    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        const { token, _id } = res.body;
        request(app)
          .post(`/api/refresh-token`)
          .set({ Authorization: token })
          .send(user)
          .end((err, res) => {
            expect(res.body._id).to.equal(_id);
            done();
          });
      });
  });
});

describe('POST /api/forget-password', () => {
  it('should return error when user is not found', done => {
    const user = createUser();
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        request(app)
          .post(`/api/forget-password`)
          .send({ email: '' })
          .end((err, res) => {
            const errors = res.body.errors;
            expect(errors.email).to.equal('Email was not found');
            done();
          });
      });
  });

  // Disabled so that the email does not get sent.
  xit('should return a success message when the user is found and send an e-mail',
    done => {
      const user = createUser();
      request(app)
        .post('/api/register')
        .send(user)
        .end((err, res) => {
          const { _id } = res.body;
          request(app)
            .get(`/api/forget-password`)
            .send({ email: user.email })
            .end((err, res) => {
              const updatedUser = res.body;
              expect(updatedUser).to.deep.equal({ success: 'Email Sent!' });
              User
                .findOne({ _id })
                .then(updatedUser => {
                  const decodedToken = decodeToken(updatedUser.token);
                  expect(decodedToken.id).to.equal(_id);
                  done();
                });
            });
        });
    });
});

describe('POST /apy/reset-password', () => {
  it('should reset the user password and return a new user with token', done => {
    const user = createUser();
    // create the user
    request(app)
      .post('/api/register')
      .send(user)
      .end((err, res) => {
        const { email } = res.body;
        request(app)
          .post(`/api/forget-password`)
          .send({ email, mailerOff: true })
          .end((err, res) => {
            const { token } = res.body;
            const newPassword = 'new-password';
            request(app)
              .post('/api/reset-password')
              .send({ token, password: newPassword, confirmPassword: newPassword })
              .end((err, res) => {
                const { id: userIdInToken } = decodeToken(res.body.token);
                expect(userIdInToken).to.equal(res.body._id);
                done();
              });
          });
      });
  });
});