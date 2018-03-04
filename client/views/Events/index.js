import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getEvents } from '../../api/events';
import { Table, Button, ButtonGroup, ButtonToolbar, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa'
import Header from '../Common/Header'
import Footer from '../Common/Footer'

const linkStyle = {
  color: 'white'
}

const buttonStyle = {
  marginRight: 10
}

class Events extends Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      events: [],
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
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
          <td>{event.event_id}</td>
          <td>{event.name}</td>
          <td>{event.deadline}</td>
          <td>{event.description}</td>
          <td>{event.end_date}</td>
          <td>{event.end_time}</td>
          <td>{event.expected_volume}</td>
          <td>{event.location}</td>
          <td>{event.organizer_id}</td>
          <td>{event.start_date}</td>
          <td>{event.start_time}</td>
        </tr>
      )
    })
  };

  render() {
    return <div>

      <Header />

      <Table striped responsive>
        <thead>
          <tr>
            <th>event_id:</th>
            <th>name:</th>
            <th>deadline</th>
            <th>description:</th>
            <th>end_date:</th>
            <th>end_time:</th>
            <th>expected_volume:</th>
            <th>location:</th>
            <th>organizer_id</th>
            <th>start_date</th>
            <th>start_time</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTable()}
        </tbody>
      </Table>

      <Footer />
    </div>
  }
}

Events.propTypes = {
  children: PropTypes.node,
};

Events.defaultProps = {};

export default Events;