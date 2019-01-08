import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login, checkIfLoggedIn } from './../actions/Auth.actions'
import { Redirect } from 'react-router-dom'


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

    renderAlerts(msgs, type) {
        console.log(msgs)
        return msgs.map(msg => (
            <div class={`alert ${type}`} role="alert">
                {msg}
            </div>
        ))
    }

    componentWillMount() {
        this.props.checkIfLoggedIn()
    }

    render() {

        const { error_msgs, success_msgs } = this.props;
        console.log(success_msgs)


        if (this.props.token.length > 0) return <Redirect to='/dashboard' />

        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>Login</h1>

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
                                    className="btn btn-primary btn-block"                                >
                                    Login
                            </button>
                            </form>
                            <p className="lead mt-4">
                                Don't have Account? <a href="/register">Register</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
        login: (email, password) => dispatch(login(email, password)),
        checkIfLoggedIn: () => dispatch(checkIfLoggedIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

