import React from 'react';
import PropTypes from 'prop-types';
import { internet } from 'faker';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes, faCheckSquare } from '@fortawesome/fontawesome-free-solid';

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

const ProfileEvent = props => {
  return (
    <div className="profile-event">
      <p className="profile-event-time">
        May 20 2018
      </p>
      <p className="profile-event-description">
        830 N. Apollo Blvd. Melbourne, FL32935
      </p>
      <div className="profile-event-icon-box">
        <FontAwesomeIcon className="color-5" icon={faCheckSquare} />
        <FontAwesomeIcon className="color-2" icon={faTimes} />
      </div>
    </div>
  );
};

const NextEvent = (props) => {
  const { event } = props;

  return (
    <div className="next-event">
      <p className="next-event-text">Your Next Events</p>
      <ProfileEvent />
    </div>
  );
};

const Profile = props => {
  return (
    <div className="profile">
      <ProfileHeader
        name="Luis Betancourt"
        hours={40}
      />
      <NextEvent />
    </div>
  );
};

Profile.propTypes = {
  children: PropTypes.node,
};

Profile.defaultProps = {};

export default Profile;