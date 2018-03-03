const app = require('./app');
const { PORT } = require('../config/constants');

// This file is on it's own because we do not want to run the test and have the
// server start up every time.
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
