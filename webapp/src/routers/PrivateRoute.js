import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar.component';

export const PrivateRoute = ({
  isAuthenticated = true,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={() => isAuthenticated ? (<Component />) :( <Redirect to="/login" />)} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);
