import React, { Component } from 'react'
import { connect } from 'react-redux'

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
          <button type="button" className="btn btn-outline-info">Edit</button>
            <li className="nav-item">
              <a className="nav-link" href="/" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li>
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

  }

};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
