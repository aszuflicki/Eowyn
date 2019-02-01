import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar.component'
import { Row, Col } from 'react-materialize'
import history from '../routers/history'

 class LandingPage extends Component {

    render() {

        return (
            <Fragment>
                <div className="container">
                <Row />
                <Row>
                    <Col s={3} />
                    <Col s={6}>
                    <h1 class="display-4">Hello there!</h1>
                        <p class="lead">General, Eowyn ;)</p>
                        <h5 >Just create account</h5>
                        <a class="btn"
                        onClick={() => history.push('/register')}
                        >Register</a>
                    </Col>
                </Row>
                    
                </div>
            </Fragment>
        )
    }
}

export default LandingPage