import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import NewNote from "./views/NewNote/NewNote";
import Notes from "./views/Notes/Notes";
import AppliedRoute from "./components/AppliedRoute/AppliedRoute";
import {AuthenticatedRoute} from './components/AuthenticatedRoute/AuthenticatedRoute';
import {UnauthenticatedRoute} from './components/UnauthenticatedRoute/UnauthenticatedRoute';

export default ({ childProps }) => (
	<Switch>
		<AppliedRoute path="/" exact component={Home} props={childProps} />
		<UnauthenticatedRoute
			path="/login"
			exact
			component={Login}
			props={childProps}
		/>
		<UnauthenticatedRoute
			path="/signup"
			exact
			component={Signup}
			props={childProps}
		/>
		<AuthenticatedRoute
			path="/notes/new"
			exact
			component={NewNote}
			props={childProps}
		/>
		<AuthenticatedRoute
			path="/notes/:id"
			exact
			component={Notes}
			props={childProps}
		/>
		<Route component={NotFound} />
	</Switch>
);
