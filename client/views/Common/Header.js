import React, { Component } from 'react';
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

const linkStyle = {
  color: 'white'
}

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return <div>
        <Navbar color="faded" light>
            <NavbarBrand href="/">VolunteerHub</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav navbar>
                <NavItem>
                    <NavLink href="/map/">Map</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/events/">List</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    </div>
  }
}

export default Header;