import React, { Component } from "react";
import styles from "./Login.module.css";
import { Auth } from "aws-amplify";
import LoaderButton from "../../components/LoaderButton/LoaderButton";

class Login extends Component {
	state = {
		email: "",
		password: "",
		isLoading: false
	};

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			await Auth.signIn(this.state.email, this.state.password);
			this.props.userHasAuthenticated(true);
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
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
					<LoaderButton
						text="Login"
						disabled={!this.validateForm()}
						type="submit"
						isLoading={this.state.isLoading}
						loadingText="Logging in..."
					/>
				</form>
			</div>
		);
	}
}

export default Login;
