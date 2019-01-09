import React, { Component, Fragment } from 'react';
import { Tabs, Tab, FormGroup, FormControl } from 'react-bootstrap';
import Navbar from '../components/Navbar.component'

class LandingPage extends Component {

    render() {

        return (
            <Fragment>
                <Navbar />
                <div className="container mt-4">
                    <div class="jumbotron">
                        <h1 class="display-4">Hello there, stranger!</h1>
                        <p class="lead">General, simple app</p>
                        <hr class="my-4" />
                        <p>Just create account</p>
                        <a class="btn btn-primary btn-lg" href="/register" role="button">Register</a>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default LandingPage