import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
	render() {
		return (
			<nav className={styles.navbar}>
				<Link to="/">scribe</Link>
				<div className={styles.iconsContainer}>
					<Link to="/signup">Signup</Link>
					<Link to="/login">Login</Link>
					</div>
			</nav>
		);
	}
}

export default NavBar;
