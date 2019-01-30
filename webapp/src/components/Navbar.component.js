import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { logout, checkIfLoggedIn } from './../actions/Auth.actions'
import { NavItem, Navbar, Icon, Button } from 'react-materialize'
import history from '../routers/history'

class NavigationBar extends Component {
  componentDidMount = () => {
    this.props.checkIfLoggedIn()
  }


  render() {


    return (
      <Fragment>
        <Navbar brand='Eowyn' className="center  indigo darken-4">
          <NavItem onClick={() => history.push('/dashboard')}>Dashboard</NavItem>
          <NavItem onClick={() => history.push('/discussions')}>#Discussions</NavItem>
          <ul className="right">
            <NavItem href='/profile'>{this.props.email}</NavItem>
            {this.props.email ?
              <NavItem
                onClick={() => this.props.logout()}
              >Log Out</NavItem>
              : <NavItem
                onClick={() => history.push('/login')}
              >Log In</NavItem>}

          </ul>
        </Navbar>
      </Fragment>
    );
  }
}

const checkIfUrl = (page) =>
  window.location.href.indexOf(page) > -1 ? 'active' : ''

const mapStateToProps = (state) => {
  return { ...state.auth }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
