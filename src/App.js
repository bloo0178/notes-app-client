import React from "react";
import Navbar from "./components/Navbar/Navbar";
import styles from "./App.module.css";
import Routes from "./Routes";
import { Auth } from "aws-amplify"; // used for accessing current user session
import { withRouter } from "react-router-dom";

class App extends React.Component {
	state = {
		isAuthenticated: false,
		isAuthenticating: true
	};

	async componentDidMount() {
		try {
			await Auth.currentSession();
			this.userHasAuthenticated(true);
		} catch (e) {
			if (e !== "No current user") {
				alert(e);
			}
		}

		this.setState({ isAuthenticating: false });
	}

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	};

	handleLogout = async event => {
		await Auth.signOut();
		this.userHasAuthenticated(false);
		this.props.history.push("/login");
	};

	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated,
			handleLogout: this.handleLogout
		};
		return (
			!this.state.isAuthenticating && (
				<div className={styles.App}>
					<Navbar childProps={childProps} />
					<Routes childProps={childProps} />
				</div>
			)
		);
	}
}

export default withRouter(App);
