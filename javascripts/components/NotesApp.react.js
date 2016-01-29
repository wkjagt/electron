import React from "react";
import Notebooks from "./NoteBooks.react";
import Notes from "./Notes.react";
import NoteEditor from "./NoteEditor.react";
import NotesStore from "../stores/NotesStore";
import FileStore from "../stores/FileStore";
import AppHeader from "./AppHeader.react";

var {Component} = React;

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  componentDidMount() {
    NotesStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    NotesStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(this._getState());
  }

  _getState() {
    return {
      notes: NotesStore.getAllNotes(),
      selectedNotebook: NotesStore.selectedNotebook(),
      selectedNote: NotesStore.selectedNote(),
    };
  }

  render() {
    return (
      <div>
        <AppHeader />
        <div className="window-content">
          <div className="pane-group">
            <div className="pane pane-sm sidebar">
              <Notebooks data={this.state} />
            </div>
            <div className="pane pane-sm sidebar">
              <Notes data={this.state} />
            </div>
            <div className="pane">
              <NoteEditor note={this.state.selectedNote} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = NotesApp;
