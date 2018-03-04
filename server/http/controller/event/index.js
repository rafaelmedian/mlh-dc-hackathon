const fetch = require('node-fetch');

const API_URL = 'https://pe9f7rkm5k.execute-api.us-east-1.amazonaws.com/beta';

/**
 * Fetches all of the events from the database
 * @param req
 * @param res
 */
const index = (req, res) => {
  fetch(`${API_URL}/event_info`)
    .then(data => data.json())
    .then(json => res.send(json))
    .catch(err => console.log(err))
};

/**
 * Get 1 event
 * @param req
 * @param res
 */
const getEvent = (req, res) => {
  const { id } = req.params;
  console.log(id);
  fetch(`${API_URL}/event_info?event_id=${id}`)
    .then(data => data.json())
    .then(json => res.send(json))
    .catch(err => console.log(err))
};

/**
 * Get 1 user
 * @param req
 * @param res
 */
const getUser = (req, res) => {
  const { id } = req.params;
  fetch(`${API_URL}/user_info?user_id=${id}`)
    .then(data => data.json())
    .then(json => {
      const user = json.users[0];
      res.send(user);
    })
    .catch(err => console.log(err))
};

const getUsers = (req, res) => {

  fetch(`${API_URL}/user_info`)
    .then(data => data.json())
    .then(json => res.send(json.users))
    .catch(err => console.log(err))
};

module.exports = {
  index,
  getUser,
  getUsers,
  getEvent,
};