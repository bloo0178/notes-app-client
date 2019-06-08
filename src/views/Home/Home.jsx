import React, { Component } from "react";
import styles from "./Home.module.css";

export default class Home extends Component {
	render() {
		return (
			<div className={styles.home}>
				<div className={styles.lander}>
					<h1>scribe</h1>
					<p>Note taking app</p>
				</div>
			</div>
		);
	}
}
