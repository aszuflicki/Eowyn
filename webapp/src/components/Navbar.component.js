import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, NavbarBrand, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'

class NavigationBar extends Component {
    render() {

        return (
            <Navbar>
                <Navbar.Header>
                    <NavbarBrand>
                        <a href="#home">Eowyn</a>
                    </NavbarBrand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        Link
              </NavItem>
                    <NavItem eventKey={2} href="#">
                        Link
              </NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
