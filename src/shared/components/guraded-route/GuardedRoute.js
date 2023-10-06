import React from 'react';
import { Route } from "react-router-dom";
import Menu from "../../../components/menu/Menu";

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} /> : <Menu />
    )} />
)

export default GuardedRoute;