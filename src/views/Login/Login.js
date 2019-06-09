import React, { Component } from "react";
import styles from "./Login.module.css";

class Login extends Component {
	state = {
		email: "",
		password: ""
	};

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
	};

	render() {
		return (
			<div className={styles.login}>
				<form onSubmit={this.handleSubmit}>
					<input
						id="email"
						type="email"
						autoFocus
						name="email"
						placeholder="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<button
						name="submit"
						type="submit"
						disabled={!this.validateForm()}
					>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
