import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getEvents } from '../../api/events';
import { Table } from 'reactstrap';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
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

  renderTable = () => {
    return this.state.events.map((event, i) => {
      return (
        <tr key={i}>
          <td>{event.deadline}</td>
          <td>{event.description}</td>
          <td>{event.end_date}</td>
          <td>{event.end_time}</td>
          <td>{event.event_id}</td>
          <td>{event.expected_volume}</td>
          <td>{event.name}</td>
          <td>{event.organizer_id}</td>
          <td>{event.start_date}</td>
          <td>{event.start_time}</td>
          <td>{event.type}</td>
        </tr>
      )
    })
  };

  render() {
    return <div>
      <Table>
        <thead>
          <tr>
            <th>deadline</th>
            <th>description:</th>
            <th>end_date:</th>
            <th>end_time:</th>
            <th>event_id:</th>
            <th>expected_volume:</th>
            <th>location:</th>
            <th>name:</th>
            <th>organizer_id</th>
            <th>start_date</th>
            <th>start_time</th>
            <th>type</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTable()}
        </tbody>
      </Table>
    </div>
  }
}

Events.propTypes = {
  children: PropTypes.node,
};

Events.defaultProps = {};

export default Events;