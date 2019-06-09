import React from "react";
import Navbar from "./components/Navbar/Navbar";
import styles from "./App.module.css";
import Routes from "./Routes";

class App extends React.Component {
	state = {
		isAuthenticated: false
	};

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	};

	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};
		return (
			<div className={styles.App}>
				<Navbar childProps={childProps} />
				<Routes childProps={childProps} />
			</div>
		);
	}
}

export default App;
