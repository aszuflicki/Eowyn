import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { logout } from './../actions/Auth.actions'
import { NavItem, Navbar, Icon, Button } from 'react-materialize'

class NavigationBar extends Component {
  render() {

    console.log()

    return (


      //     </ul>
      //     <ul className="navbar-nav justify-content-end">
      //       <li className="nav-item">
      //         <a className="nav-link" href="/profile" tabIndex="-1" >{this.props.email}</a>
      //       </li>
      //       {this.props.token.length > 0 ?
      //         <button type="button" className="btn btn-danger"
      //           onClick={() => this.props.logout()}
      //         >
      //           Logout
      //      </button> : ''
      //       }
      //     </ul>
      //   </div>
      // </nav>
      <Fragment>
        <Navbar brand='Eowyn' className="center  indigo darken-4">

          <NavItem href='/dashboard'>Dashboard</NavItem>
          <NavItem href='/discussion'>#Discussions</NavItem>
          <ul className="right">

            <NavItem href='/profile'>{this.props.email}</NavItem>
            <NavItem>Log Out</NavItem>


          </ul>
        </Navbar>

      </Fragment>

    );
  }
}

const checkIfUrl = (page) =>
  window.location.href.indexOf(page) > -1 ? 'active' : ''

const mapStateToProps = (state) => {
  return {
    ...state.auth
  }

};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
