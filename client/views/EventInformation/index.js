import React from 'react';
import Carousel from '../Carousel';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/fontawesome-free-solid';
import { ymdToDate } from '../../utils';
import IconBox from '../IconBox';
import { image, internet, name } from 'faker';

const UserProfile = props => {
  return (
    <div className="user-profile">
      <div>
        <img
          className="img-fluid"
          src={props.avatar}
          alt=""
        />
      </div>
      <div>
        <p>{props.name}</p>
      </div>
    </div>
  );
};

const EventInformation = props => {
  const { className, event, toggle, close } = props;

  return (
    <div className="event-information">
      <div className="event-information-header">
        <span
          className="map-drawer-close-btn"
          onClick={() => {
            close();
            toggle(false);
          }}
        >
          X
        </span>
        <Carousel
          type={event.type}
          items={Array(5).fill('').map(item => ({ src: image[event.type]() }))}
        />
      </div>
      <div className="event-information-body">
        <div className="event-information-location-box">
          <IconBox icon={faClock}>
            {event.location}
          </IconBox>
          <IconBox icon={faStar}>
            Its flexible we will work with your schedule
          </IconBox>
        </div>
        <div>
          <p className="event-information-title subheading">
            Church of Virginia
          </p>

          <p className="event-information-time copy-3">
            {ymdToDate(event)}
          </p>
          <p className="event-information-description heading">{event.name}</p>
          <p className="event-information-description copy-2">{event.description}</p>
        </div>

        <div className="star-box">
          <FontAwesomeIcon className="color-4" icon={faStar} />
          <FontAwesomeIcon className="color-4" icon={faStar} />
          <FontAwesomeIcon className="color-4" icon={faStar} />
          <FontAwesomeIcon className="color-4" icon={faStar} />
        </div>

      </div>
      <div className="event-information-footer">
        <button className="btn-volunteer">
          Yest I want to Help!
        </button>
      </div>
      <div className="event-participants">
        {Array(20).fill('').map((item, index) => {
          return <UserProfile
            key={index}
            avatar={internet.avatar()}
            // name={name.firstName()}
          />
        })}
      </div>
      <div className="event-information-footer">
        <button className="btn-volunteer">
          Yest I want to Help!
        </button>
      </div>
    </div>
  )
};

export default EventInformation;
