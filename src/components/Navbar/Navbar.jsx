import React, { Fragment } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
	handleLogout = event => {
		this.props.childProps.userHasAuthenticated(false);
	};
	render() {
		//const test = {...this.props.childProps};
		//console.log(test);
		return (
			<Fragment>
				{this.props.childProps.isAuthenticated ? (
					<nav className={styles.navbar}>
						<button onClick={this.handleLogout}>
							logout
						</button>
					</nav>
				) : (
					<nav className={styles.navbar}>
						<Link to="/">scribe</Link>
						<div className={styles.iconsContainer}>
							<Link to="/signup">Signup</Link>
							<Link to="/login">Login</Link>
						</div>
					</nav>
				)}
			</Fragment>
		);
	}
}

export default NavBar;
