import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { register } from './../actions/Auth.actions'
import { Redirect } from 'react-router-dom'
import Navbar from '../components/Navbar.component'
import { Row, Col } from 'react-materialize'

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.email = React.createRef();
        this.password = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props)

        this.props.register(this.email.current.value, this.password.current.value)
    }

    renderAlerts(msgs, type) {
        return msgs.map(msg => (
            <div class={`alert ${type}`} role="alert">
                {msg}
            </div>
        ))
    }

    render() {
        if (this.props.isRegistered) return <Redirect to='/login' />

        const { error_msgs, success_msgs } = this.props;
        return (
            <Fragment>
                <div className="container">
                    <Row>
                        <Col s={3} />
                        <Col s={6} >
                            <h1 className="center">Register</h1>
                            {this.renderAlerts(error_msgs, 'alert-danger')}
                            {this.renderAlerts(success_msgs, 'alert-success')}
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        ref={this.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        ref={this.password}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn right"
                                >Register</button>

                            </form>
                            <p className="lead mt-4">
                                Already have Account? <a href="/login">Login</a>
                            </p>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        ...state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (email, password) => dispatch(register(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

