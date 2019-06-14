import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import config from "../../config";
import LoaderButton from '../../components/LoaderButton/LoaderButton';
import styles from "./Notes.module.css";

class Notes extends Component {
	constructor(props) {
		super(props);

		this.file = null;

		this.state = {
			note: null,
			content: "",
            attachmentURL: null,
            isLoading: null,
            isDeleting: null
		};
	}

	async componentDidMount() {
		try {
			let attachmentURL;
			const note = await this.getNote();
			const { content, attachment } = note;

			if (attachment) {
				attachmentURL = await Storage.vault.get(attachment);
			}

			this.setState({
				note,
				content,
				attachmentURL
			});
		} catch (e) {
			alert(e);
		}
	}

	getNote() {
		return API.get("notes", `/notes/${this.props.match.params.id}`);
	}

	validateForm() {
		return this.state.content.length > 0;
	}

	formatFilename(str) {
		return str.replace(/^\w+-/, "");
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
				`Please pick a file smaller than ${
					config.MAX_ATTACHMENT_SIZE
				}`
			);
			return;
		}

		this.setState({ isLoading: true });
	};

	handleDelete = async event => {
		event.preventDefault();

		const confirmed = window.confirm(
			"Are you sure you want to delete this note?"
		);

		if (!confirmed) {
			return;
		}

		this.setState({ isDeleting: true });
	};

	render() {
		return (
			<div className={styles.notes}>
				{this.state.note && (
					<form onSubmit={this.handleSubmit}>
						<textarea
							id="content"
							onChange={this.handleChange}
							value={this.state.content}
						/>
						{this.state.note.attachment && (
							<div>
								<label>Attachment</label>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={this.state.attachmentURL}
								>
									{this.formatFilename(
										this.state.note.attachment
									)}
								</a>
							</div>
						)}
						{!this.state.note.attachment && (
							<label>Attachment</label>
						)}
						<input
							id="file"
							type="file"
							onChange={this.handleFileChange}
						/>
						<LoaderButton
							disabled={!this.validateForm()}
							type="submit"
							isLoading={this.state.isLoading}
							text="Save"
							loadingText="Saving..."
						/>
						<LoaderButton
							isLoading={this.state.isDeleting}
							onClick={this.handleDelete}
							text="Delete"
							loadingText="Deleting..."
						/>
					</form>
				)}
			</div>
		);
	}
}

export default Notes;
