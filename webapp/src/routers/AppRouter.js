import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
import Chart from '../components/Chart/Index.component'
import Navbar from '../components/Navbar.component'
import Sidebar from '../components/Sidebar.component'

export const history = createHistory();

const AppRouter = () => (
    <React.Fragment>
        <Navbar />
        <div class="container-fluid">
            <div className="row">
                <div className="col-md-2 sidebar">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Router history={history}>
                        <Switch>
                            <Route path="/" component={Chart} />

                        </Switch>
                    </Router>
                </div>
            </div>
        </div>

    </React.Fragment>
);

export default AppRouter;