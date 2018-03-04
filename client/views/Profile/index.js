import React, { Component } from 'react';
import { internet } from 'faker';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes, faCheckSquare } from '@fortawesome/fontawesome-free-solid';
import { getEvent, getUser } from '../../api/events';
import { ymdToDate } from "../../utils";

const USER_ID = 7;

const ProfileHeader = props => {
  const { hours, name } = props;

  return (
    <div className='profile-header'>
      <div className="profile-avatar">
        <img src={internet.avatar()} alt="" />
      </div>
      <div className="profile">
        <p className="profile-name">
          {name}
        </p>
        <p className="profile-hours">
          {hours} hours volunteered
        </p>
      </div>
    </div>
  );
};

const EventInfo = () => {
  return (
    <div className="profile-event-info">
      <p className="profile-event-title">Church of Virginia</p>
      <p className="profile-event-time">16th March, 7 PM - 12:00 PM</p>
      <p className="profile-event-description">We're looking for two to three-man crews to
        pick up local donations and deliver furniture and appliances to our thrift-store
        customers. All of the proceeds from our sales go directly to our client program
        that helps people in need.</p>
    </div>
  );
};

const ProfileEvent = props => {
  const { event } = props;
  return (
    <div className="profile-event">
      <p className="profile-event-time">
        {ymdToDate(event)}
      </p>
      <p className="profile-event-description">
        {event.description}
      </p>
      <div className="profile-event-icon-box">
        <FontAwesomeIcon className="color-5" icon={faCheckSquare} />
        <FontAwesomeIcon className="color-2" icon={faTimes} />
      </div>
    </div>
  );
};

const NextEvent = (props) => {
  return (
    <div className="next-event">
      <p className="next-event-text">Your Next Events</p>
      {props.children}
    </div>
  );
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  componentWillMount() {
    // Gets the user with the user events
    getUser(USER_ID)
      .then(({ data }) => {
        this.setState(data);
        return data.registered_events;
      })
      .then(registeredEvents => {
        const events = registeredEvents.map(
          registeredEvent => getEvent(registeredEvent).then(x => x.data.events[0]));

        Promise
          .all(events)
          .then(result => this.setState({ events: result }));
      })
      .catch(err => console.log('Error', err));
  }

  render() {
    return (
      <div className="profile">
        <ProfileHeader
          name={this.state.first_name + ' ' + this.state.last_name}
          hours={this.state.hours}
        />
        <NextEvent>
          {this.state.events.map((event, index) => {
            return (
              <ProfileEvent
                event={event}
                index={index}
              />
            );
          })}
        </NextEvent>
        <EventInfo />
      </div>
    );
  }
}

Profile.propTypes = {
  children: PropTypes.node,
};

Profile.defaultProps = {};

export default Profile;