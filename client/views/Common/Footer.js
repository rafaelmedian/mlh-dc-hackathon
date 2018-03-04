import React, { Component } from 'react';
import { Table, Button, ButtonGroup, ButtonToolbar, Collapse,
  Container, Row, Col,
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
    color: 'white',
    minWidth: 90
}
  
const buttonStyle = {
    marginRight: 0,
    background: 'transparent'
}

const rowStyle = {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    textAlign:'center'
}

class Footer extends Component {

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
        <Navbar color="dark" className="navbar fixed-bottom">
            <Container>
                <Row style={rowStyle}>
                    <Col><NavLink style={linkStyle} href="/map/"><FontAwesome.FaMap /> Map</NavLink></Col>
                    <Col><NavLink style={linkStyle} href="/events/"><FontAwesome.FaList /> List</NavLink></Col>
                    <Col><NavLink style={linkStyle} href="/top/"><FontAwesome.FaHeart /> Favs</NavLink></Col>
                </Row>
            </Container>
            
            
        </Navbar>
    </div>
  }
}

export default Footer;