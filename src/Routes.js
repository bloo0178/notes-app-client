import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from './views/NotFound/NotFound';
import Login from "./views/Login/Login";

export default () => (
	<Switch>
		<Route path="/" exact component={Home} />
		<Route path="/login" exact component={Login} />
        <Route component={NotFound} />
	</Switch>
);
