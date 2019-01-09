import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
// import Navbar from '../components/Navbar.component'

import LandingPage from '../components/LandingPage.component'
import RegisterPage from '../components/RegisterPage.component'
import LoginPage from '../components/LoginPage.component'
import Dashboard from '../components/Dashboard/Dashboard.component'

export const history = createHistory();

const AppRouter = () => (
    <React.Fragment>
        <Router history={history}>
            <Switch>
                {/* <Route path="/" exact={true} component={Dashboard} /> */}
                <Route path="/" exact={true} component={LandingPage} />
                <PublicRoute path="/register" exact={true} component={RegisterPage} />
                <PublicRoute path="/login" exact={true} component={LoginPage} />
                <PrivateRoute path="/dashboard" component={Dashboard} />

            </Switch>
        </Router>
    </React.Fragment>
);

export default AppRouter;