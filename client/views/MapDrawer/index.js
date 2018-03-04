import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfoBox from '../InfoBox';
import EventInformation from '../EventInformation';

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