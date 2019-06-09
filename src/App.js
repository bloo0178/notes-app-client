import React from "react";
import Navbar from "./components/Navbar/Navbar";
import styles from "./App.module.css";
import Routes from "./Routes";

function App() {
	return (
		<div className={styles.App}>
			<Navbar />
			<Routes />
		</div>
	);
}

export default App;
