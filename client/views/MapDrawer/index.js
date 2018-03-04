import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Carousel from '../Carousel';

import {
  faShareAlt,
  faHeart,
  faClock,
  faStar
} from '@fortawesome/fontawesome-free-solid';

const InfoBox = (props) => {
  const { className, event, toggle, close } = props;

  return (
    <div className={className}>
      <div className="map-drawer-header">
        <span className="map-drawer-title">
          {event.name}
        </span>
        <span
          className="map-drawer-close-btn"
          onClick={() => {
            close();
            toggle(false);
          }}
        >
          X
        </span>

      </div>
      <div className="map-header-body">
        <div>
          <p className="map-drawer-time">{event.start_date}, {event.start_time} - {event.end_time}</p>
          <p className="map-drawer-description">{event.description}</p>
        </div>

        <div>
          <img
            className="img-fluid"
            src="https://picsum.photos/150/150"
            alt=""
          />
          <div className="map-header-icons">
            <FontAwesomeIcon className="color-3" icon={faShareAlt} />
            <FontAwesomeIcon className="color-2" icon={faHeart} />
          </div>
        </div>
      </div>
      <div>

        <div className="map-footer">
          <button
            onClick={toggle}
            className="map-footer-btn"
          >
            View More
          </button>
          <button className="map-footer-btn">
            Accept
          </button>
        </div>
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
        <Carousel />
      </div>
      <div className="event-information-body">
        <div className="event-information-location-box">
          <div>
            <p>{event.location}</p>
          </div>
          <div>
            <FontAwesomeIcon className="color-1" icon={faClock} />
            <span>It's flexible we will work with your schedule</span>
          </div>
        </div>
        <div>
          <p className="event-information-time">{event.start_date}, {event.start_time} - {event.end_time}</p>
          <p className="event-information-description">{event.description}</p>
        </div>
      </div>
      <div>
        <FontAwesomeIcon className="color-4" icon={faStar} />
        <FontAwesomeIcon className="color-4" icon={faStar} />
        <FontAwesomeIcon className="color-4" icon={faStar} />
        <FontAwesomeIcon className="color-4" icon={faStar} />
      </div>
      <div className="event-information-footer">
        <button className="btn-volunteer">
          Yest I want to Help!
        </button>
      </div>
    </div>
  )
};

class MapDrawer extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  toggle = (bool) => {
    typeof bool === 'boolean'
      ? this.setState({ isOpen: bool })
      : this.setState({ isOpen: !this.state.isOpen, })
  };

  render() {
    const { event, close } = this.props;
    if (!event) return null;

    if (this.state.isOpen) {
      return <EventInformation
        event={event}
        className="map-drawer is-open"
        close={close}
        toggle={this.toggle}
      />
    }

    return (
      <InfoBox
        event={event}
        className={'map-drawer'}
        close={close}
        toggle={this.toggle}
      />
    );
  }
}

MapDrawer.propTypes = {
  children: PropTypes.node,
};

MapDrawer.defaultProps = {};

export default MapDrawer;