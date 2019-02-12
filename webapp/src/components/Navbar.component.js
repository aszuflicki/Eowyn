import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { logout, checkIfLoggedIn } from './../actions/Auth.actions'
import { justNotifyNewPost } from '../actions/Discussions.actions'
import { NavItem, Navbar, Icon, Button } from 'react-materialize'
import { ToastContainer } from 'react-toastify'
import history from '../routers/history'
const io = require('socket.io-client')

class NavigationBar extends Component {
  componentWillMount = () => {
    this.props.checkIfLoggedIn()
    const id = window.location.href.split('/')[4]



  }

  componentDidUpdate = () => {
    const socket = io(`/api/following/${this.props.email.replace('@', '&')}`)
      .on('new_post', (post, discussion) => {
        console.log(post)
        if (post.author != this.props.email && window.location.href.split('/')[3] != 'discussion') {
          this.props.justNotifyNewPost(post, discussion)
        }
      })
  }


  render() {
    return (
      <Fragment>
        <Navbar brand='Eowyn' className="center  indigo darken-4">
          <NavItem onClick={() => history.push('/dashboard')}>Dashboard </NavItem>
          <NavItem onClick={() => history.push('/discussions')}>#Discussions</NavItem>
          <ul className="right">
            {this.props.email ? (
              <NavItem href='/profile'>
                <img src={`/api/profile/pic/${this.props.email}`} alt="" className="circle" style={{ width: "32px", height: "32px", position: "absolute", top: "15px" }} />
                <span style={{ paddingLeft: "40px" }}>{this.props.email}</span></NavItem>
            ) : ''}

            {this.props.email ?
              <NavItem
                onClick={() => this.props.logout()}
              >Log Out</NavItem>
              : <NavItem
                onClick={() => history.push('/login')}
              >Log In</NavItem>}

          </ul>
        </Navbar>
        <ToastContainer autoClose={5000} />
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
    checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
    justNotifyNewPost: (...args) => dispatch(justNotifyNewPost(...args))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
