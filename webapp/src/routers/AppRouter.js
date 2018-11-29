import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
// import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Chart from '../components/Chart/Index.component'
import Navbar from '../components/Navbar.component'
import Sidebar from '../components/Sidebar.component'

import LandingPage from '../components/LandingPage.component'
import Dashboard from '../components/Dashboard.component'

export const history = createHistory();

const AppRouter = () => (
    <React.Fragment>
        <Router history={history}>
            <Switch>
                <Route path="/" exact={true} component={Chart} />
                {/* <PublicRoute path="/" exact={true} component={LandingPage} /> */}
                {/* <PublicRoute path="/dashboard" component={Dashboard} /> */}

            </Switch>
        </Router>
    </React.Fragment>
);

export default AppRouter;