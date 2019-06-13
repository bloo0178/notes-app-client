import React, { Component } from "react";
import styles from "./Home.module.css";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

export default class Home extends Component {
	state = {
		isLoading: true,
		notes: []
	};

	async componentDidMount() {
		if (!this.props.isAuthenticated) {
			return;
		}

		try {
			const notes = await this.notes();
			this.setState({ notes });
		} catch (e) {
			alert(e);
		}

		this.setState({ isLoading: false });
	}

	notes() {
		return API.get("notes", "/notes");
	}

	renderNotesList(notes) {
		return [{}].concat(notes).map((note, i) =>
			i !== 0 ? (
				<Link
					key={note.noteId}
					to={`/notes/${note.noteId}`}
				>
					<h4>{note.content.trim().split("\n")[0]}</h4>
					<ul>
						<li>
							{"Created: " +
								new Date(
									note.createdAt
								).toLocaleString()}
						</li>
					</ul>
				</Link>
			) : (
				<Link key="new" to="/notes/new">
					<ul>
						<li>
							<h4>
								<b>{"\uFF0B"}</b> Create a new note
							</h4>
						</li>
					</ul>
				</Link>
			)
		);
	}

	renderLander() {
		return (
			<div className={styles.lander}>
				<h1>scribe</h1>
				<p>Note taking app</p>
			</div>
		);
	}

	renderNotes() {
		return (
			<div className={styles.notes}>
				<h3>Your Notes</h3>
				<ul>
					{!this.state.isLoading &&
						this.renderNotesList(this.state.notes)}
				</ul>
			</div>
		);
	}

	render() {
		return (
			<div className={styles.home}>
				{this.props.isAuthenticated
					? this.renderNotes()
					: this.renderLander()}
			</div>
		);
	}
}
