const app = require('../../../app');
const request = require('supertest');

describe.only('EventController', () => {
  it('should GET to /api/events', done => {
    request(app)
      .get('/api/events')
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });
});
