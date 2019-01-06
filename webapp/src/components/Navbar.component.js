import React, { Component } from 'react'
import { connect } from 'react-redux'

class NavigationBar extends Component {
  render() {

    console.log()

    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/">Eowyn</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class={`nav-item ${checkIfUrl('dashboard')}`}>
              <a class="nav-link" href="/">Dashboard </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Link</a>
            </li>
            

          </ul>
          <ul class="navbar-nav justify-content-end">
          <button type="button" class="btn btn-outline-info">Edit</button>
            <li class="nav-item">
              <a class="nav-link" href="/" tabindex="-1" aria-disabled="true">Disabled</a>
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
