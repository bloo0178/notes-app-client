import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from './views/NotFound/NotFound';

export default () => (
	<Switch>
		<Route path="/" exact component={Home} />
        <Route component={NotFound} />
	</Switch>
);
