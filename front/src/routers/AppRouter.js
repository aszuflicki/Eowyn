import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import history from '../history';

import LandingPage from './../components/LandingPage.component'

const AppRouter = () => (


    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" exact={true} component={LandingPage} />
            </Switch>
        </div>
    </Router>

);

export default AppRouter;
