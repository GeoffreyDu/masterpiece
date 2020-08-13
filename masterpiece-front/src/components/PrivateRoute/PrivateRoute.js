import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getWithExpiry from "../../config/getWithExpiry";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        getWithExpiry("access_token") ? <Component {...props} /> : <Redirect to={{ pathname: '/connexion', state: { from: props.location } }} />
    )} />
)
