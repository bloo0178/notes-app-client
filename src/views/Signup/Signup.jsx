import React, { Component } from "react";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import styles from "./Signup.module.css";
import { Auth } from "aws-amplify";

class Signup extends Component {
	state = {
		isLoading: false,
		email: "",
		password: "",
		confirmPassword: "",
		confirmationCode: "",
		newUser: null
	};

	validateForm() {
		return (
			this.state.email.length > 0 &&
			this.state.password.length > 0 &&
			this.state.password === this.state.confirmPassword
		);
	}

	validateConfirmationForm() {
		return this.state.confirmationCode.length > 0;
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
			const newUser = await Auth.signUp({
				username: this.state.email,
				password: this.state.password
            });
            // User won't currently be able to confirm account if 
            // they refresh page at confirm step. They will need to
            // create a new account. Need to:
            // 1 - Check for UsernameExistsException in the catch block here
            // 2 - Use Auth.resendSignUp() to resend the code if user was not
            // previously confirmed.
            // 3 - Confirm the code as normal
            // https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
			this.setState({
				newUser
			});
		} catch (e) {
			alert(e.message);
		}
		this.setState({ isLoading: false });
	};

	handleConfirmationSubmit = async event => {
		event.preventDefault();
		this.setState({ isLoading: true });

		try {
			await Auth.confirmSignUp(
				this.state.email,
				this.state.confirmationCode
			);
			await Auth.signIn(this.state.email, this.state.password);

			this.props.userHasAuthenticated(true);
			this.props.history.push("/");
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
	};

	renderConfirmationForm() {
		return (
			<form onSubmit={this.handleConfirmationSubmit}>
				<label>Confirmation Code</label>
				<input
					id="confirmationCode"
					autoFocus
					type="tel"
					value={this.state.confirmationCode}
					onChange={this.handleChange}
				/>
				<label>Please check your email for the code.</label>
				<LoaderButton
					disabled={!this.validateConfirmationForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Verify"
					loadingText="Verifying..."
				/>
			</form>
		);
	}

	renderForm() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Email</label>
				<input
					autoFocus
					id="email"
					type="email"
					value={this.state.email}
					onChange={this.handleChange}
				/>
				<label>Password</label>
				<input
					id="password"
					value={this.state.password}
					onChange={this.handleChange}
					type="password"
				/>
				<label>Confirm Password</label>
				<input
					id="confirmPassword"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
					type="password"
				/>
				<LoaderButton
					disabled={!this.validateForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Signup"
					loadingText="Signing up..."
				/>
			</form>
		);
	}

	render() {
		return (
			<div className={styles.signup}>
				{this.state.newUser === null
					? this.renderForm()
					: this.renderConfirmationForm()}
			</div>
		);
	}
}

export default Signup;
