import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
// import Navbar from '../components/Navbar.component'
import history from './history';
import LandingPage from '../components/LandingPage.component'
import RegisterPage from '../components/RegisterPage.component'
import LoginPage from '../components/LoginPage.component'
import Dashboard from '../components/Dashboard/Dashboard.component'
import ProfilePage from '../components/ProfilePage.component'
import Discussions from '../components/Discussions.component'

// export const history = createHistory();

const AppRouter = () => (
    <React.Fragment>
        <Router history={history}>
            <Switch>
                <Route path="/" exact={true} component={LandingPage} />
                <PublicRoute path="/register" exact={true} component={RegisterPage} />
                <PublicRoute path="/login" exact={true} component={LoginPage} /> 
                <PrivateRoute path="/discussions/:topic" component={Discussions} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <Route path="/dashboard/:tab" component={Dashboard} />
                <PrivateRoute path="/dashboard" component={Dashboard} />

            </Switch>
        </Router>
    </React.Fragment>
);

export default AppRouter;