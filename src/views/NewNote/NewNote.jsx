import React, { Component } from "react";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import config from "../../config";
import styles from "./NewNote.module.css";

class NewNote extends Component {
	file = null;
	state = {
		isLoading: null,
		content: ""
	};

	validateForm() {
		return this.state.content.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleFileChange = event => {
		this.file = event.target.files[0];
	};

	handleSubmit = async event => {
		event.preventDefault();

		if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
			alert(
				`File exceeds the size limit of ${config.MAX_ATTACHMENT_SIZE /
					1000000} MB.`
			);
			return;
		}

		this.setState({ isLoading: true });
	};

	render() {
		return (
			<div className={styles.newNote}>
				<form onSubmit={this.handleSubmit}>
					<textarea
						onChange={this.handleChange}
						value={this.state.content}
						id="content"
					/>
					<label>Attachment</label>
					<input type="file" onChange={this.handleFileChange} />
					<LoaderButton
						type="submit"
						disabled={!this.validateForm()}
						isLoading={this.state.isLoading}
						text="Create"
						loadingText="Creating..."
					/>
				</form>
			</div>
		);
	}
}


export default NewNote;