import React from 'react';
import PropTypes from 'prop-types';

const MapDrawer = props => {
  const { event, close } = props;
  if (!event) return null;

  return (
    <div className="map-drawer">

      <span
        className="map-drawer-close-btn"
        onClick={close}
      >
        X
      </span>

      <div>
        <img
          className="img-fluid"
          src="http://placehold.it/150/150"
          alt=""
        />
      </div>
      <div>
        <p>{event.name}</p>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

MapDrawer.propTypes = {
  children: PropTypes.node,
};

MapDrawer.defaultProps = {};

export default MapDrawer;