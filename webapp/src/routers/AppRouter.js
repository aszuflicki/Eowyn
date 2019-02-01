import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Navbar from './../components/Navbar.component'
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import history from './history';
import LandingPage from '../components/LandingPage.component'
import RegisterPage from '../components/RegisterPage.component'
import LoginPage from '../components/LoginPage.component'
import Dashboard from '../components/Dashboard/Dashboard.component'
import ProfilePage from '../components/ProfilePage.component'
import Discussion from '../components/Discussions/Discussion.component'
import Discussions from '../components/Discussions/Discussions.component'
import NewDiscussion from '../components/Discussions/NewDiscussion.component'
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => (
    <React.Fragment>
        <Navbar />

        <Router history={history}>
            <Switch>
                <Route path="/" exact={true} component={LandingPage} />
                <PublicRoute path="/register" exact={true} component={RegisterPage} />
                <PublicRoute path="/login" exact={true} component={LoginPage} />
                <Route path="/discussions" exact={true} component={Discussions} />
                <Route path="/discussions/new" exact={true} component={NewDiscussion} />
                <Route path="/discussion/:topic" component={Discussion} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/dashboard/:tab" component={Dashboard} />
                <PrivateRoute path="/dashboard" component={Dashboard} />

            </Switch>
        </Router>
        
    </React.Fragment>
);

export default AppRouter;