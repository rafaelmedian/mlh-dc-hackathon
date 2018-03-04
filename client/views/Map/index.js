import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getEvents } from '../../api/events';
import {
  Marker,
  GoogleMap,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';
import MapMenu from '../MapMenu';
import MapDrawer from '../MapDrawer';

const DEFAULT_ZOOM = 12;
const DEFAULT_CENTER = { lat: 38.8879295, lng: -77.1100426 };

const EventMarkers = (props) => {
  const { events, onMarkerClick } = props;

  return events.map((event, i) => {
    const [lat, lng] = event.coordinate;

    return (
      <Marker
        key={i}
        onClick={() => onMarkerClick(i)}
        position={{ lat, lng }}
      />
    );
  });
};

const MapHOC = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={DEFAULT_ZOOM}
      defaultCenter={props.defaultCenter}
    >
      {/* Add the markers here */}
      <EventMarkers
        events={props.events}
        onMarkerClick={props.onMarkerClick}
      />
    </GoogleMap>
  );
}));

MapHOC.propTypes = {
  children: PropTypes.node,
  isMarkerShown: PropTypes.bool,
};

MapHOC.defaultProps = {
  isMarkerShown: true,
  defaultCenter: DEFAULT_CENTER,
};

class Map extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      selectedEvent: null,
    };
  }

  componentWillMount() {
    getEvents()
      .then(({ data }) => {
        const events = data.events;
        if (events) this.setState({ events });
      })
      .catch(err => console.log(err));
  }

  getSelectedEvent = () => {
    const { selectedEvent, events } = this.state;

    if (!events) return null;
    const event = events[selectedEvent];
    if (!event) return null;

    return event;
  };

  onMarkerClick = id => {
    this.setState({
      selectedEvent: id
    });
  };

  closeDrawer = () => {
    this.setState({
      selectedEvent: null,
    });
  };

  render() {
    return (
      <div>
        <MapMenu className="map-menu-navigation" />
        <MapHOC
          onMarkerClick={this.onMarkerClick}
          events={this.state.events}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <MapDrawer
          event={this.getSelectedEvent()}
          close={this.closeDrawer}
        />
      </div>
    );
  }
}

Map.propTypes = {
  children: PropTypes.node,
};

Map.defaultProps = {};

export default Map;