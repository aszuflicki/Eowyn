import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { login, checkIfLoggedIn } from './../actions/Auth.actions'
import { Redirect } from 'react-router-dom'
import Navbar from '../components/Navbar.component'
import { Row, Col } from 'react-materialize'



class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.email = React.createRef();
        this.password = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.email.current.value, this.password.current.value)
    }


    componentWillMount() {
        this.props.checkIfLoggedIn()
    }

    render() {

        if (this.props.token.length > 0) return <Redirect to='/dashboard' />

        return (
            <Fragment>
                <div className="container">
                    <Row>
                        <Col s={3} />
                        <Col s={6} >
                            <h1 className="center">Login</h1>
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
                                    <label htmlFor="password">Password</label>
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
                                    className="btn right"                                >
                                    Login
                                </button>
                            </form>
                            <p className="lead mt-4">
                                Don't have Account? <a href="/register">Register</a>
                            </p>
                        </Col>
                    </Row>
                </div >
            </Fragment >
        )
    }
}
function mapStateToProps(state) {
    return {
        ...state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password)),
        checkIfLoggedIn: () => dispatch(checkIfLoggedIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

