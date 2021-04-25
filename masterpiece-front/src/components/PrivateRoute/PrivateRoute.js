import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import getAccessToken from "../../config/getAccessToken";

// Allows access to particular page if the user is logged else there is a redirection to connection page
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        getAccessToken("access_token") ? <Component {...props} /> : <Redirect to={{ pathname: '/connexion', state: { from: props.location } }} />
    )} />
)
