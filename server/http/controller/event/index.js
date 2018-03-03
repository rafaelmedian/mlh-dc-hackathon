const fetch = require('node-fetch');

const email = {
  "email": "email@gmail.com",
  "first_name": "John",
  "hours": 20.5,
  "last_name": "Smith",
  "location": [
    38.9,
    77
  ],
  "password": "123456",
  "preferred_event_type": [
    1,
    2
  ],
  "rating": 4.3,
  "rating_volume": 225,
  "registered_events": [
    1,
    2
  ],
  "skills": "housekeeping",
  "user_id": 1,
  "username": "raj"
};

const event = {
  "deadline": "2018-03-01",
  "description": "The most amazing Hackathon in the U.S.",
  "end_date": "2018-03-04",
  "end_time": "18:00",
  "event_id": 1,
  "expected_volume": 10,
  "location": "National Union Building, 918 F St NW, Washington, DC 20004",
  "name": "Disrupt the District",
  "organizer_id": 1,
  "start_date": "2018-03-03",
  "start_time": "08:00",
  "type": "Tech meeting",
  "coordinates": [
    18.4258668,
    -66.0940403,
  ],
};

/**
 * Fetches all of the events from the database
 * @param req
 * @param res
 */
const index = (req, res) => {
  fetch('https://pe9f7rkm5k.execute-api.us-east-1.amazonaws.com/beta/event_info')
    .then(data => data.json())
    .then(json => res.send(json))
    .catch(err => console.log(err))
};

module.exports = {
  index,
};