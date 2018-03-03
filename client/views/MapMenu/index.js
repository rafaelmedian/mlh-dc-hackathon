import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

const MapMenu = props => {
  const classNames = classnames('map-menu', props.className);

  return (
    <div className={classNames}>
      <div>
        <input className="event-search-input" type="text" placeholder="Search" />
      </div>
      <div>
        <NavLink to="/map">Map</NavLink>
        <NavLink to="/events">list</NavLink>
      </div>
    </div>
  );
};

MapMenu.propTypes = {
  children: PropTypes.node,
};

MapMenu.defaultProps = {};

export default MapMenu;
