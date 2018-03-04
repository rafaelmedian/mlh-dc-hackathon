import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, } from '@fortawesome/fontawesome-free-solid';
import { ymdToDate } from '../../utils';
import { image } from 'faker';

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
          <p className="map-drawer-time">
            {ymdToDate(event)}
          </p>
          <p className="map-drawer-description">{event.description}</p>
        </div>

        <div>
          <img
            className="img-fluid"
            src={image[event.type]()}
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

export default InfoBox;