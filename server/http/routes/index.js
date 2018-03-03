const UserController = require('../controller/user/index');
const EventController = require('../controller/event/index');
const jwtAuth = require('../middleware/jwtAuth');
const { sendEmail } = require('../services/mailer');

const authRoutes = app => {
  app.post('/api/login', UserController.login);
  app.post('/api/register', UserController.register);
  app.post('/api/reset-password', UserController.resetPassword);
  app.post('/api/refresh-token', UserController.refreshUserToken);
  app.post('/api/forget-password', UserController.forgetPassword, sendEmail);
};

const userRoutes = app => {
  app.get('/api/users', UserController.index);
  app.get('/api/users/:id', UserController.findById);
};

const eventRoutes = app => {
  app.get('/api/events', EventController.index);
};

module.exports = (app) => {
  authRoutes(app);
  userRoutes(app);
  eventRoutes(app)
};
