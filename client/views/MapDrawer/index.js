import React, { Component } from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart } from '@fortawesome/fontawesome-free-solid';

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
    const className = classnames(
      'map-drawer',
      { 'is-open': this.state.isOpen }
    );
    const { event, close } = this.props;
    if (!event) return null;

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
              this.toggle(false);
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

          <div className="map-drawer-date">
            <p onClick={this.toggle} className="text-center"> V </p>
          </div>
        </div>
      </div>
    );
  }
}

MapDrawer.propTypes = {
  children: PropTypes.node,
};

MapDrawer.defaultProps = {};

export default MapDrawer;