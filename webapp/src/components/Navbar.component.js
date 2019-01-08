import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from './../actions/Auth.actions'

class NavigationBar extends Component {
  render() {

    console.log()

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">Eowyn</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${checkIfUrl('dashboard')}`}>
              <a className="nav-link" href="/">Dashboard </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Link</a>
            </li>


          </ul>
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link" href="/profile" tabIndex="-1" >{this.props.email}</a>
            </li>
            <button type="button" className="btn btn-danger"
              onClick={() => {
                this.props.logout()
                console.log(this.props)
                // this.props.history.push('/')
              }}
            >
              Logout
            </button>

          </ul>


        </div>
      </nav>
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
