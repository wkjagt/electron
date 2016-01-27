import React from "react";
import Notebooks from "./NoteBooks.react";
import Notes from "./Notes.react";
import NoteEditor from "./NoteEditor.react";
import NotesStore from "../stores/NotesStore";
import FileStore from "../stores/FileStore";

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
      <div className="flex-container">
        <Notebooks data={this.state} />
        <Notes data={this.state} />
        <NoteEditor note={this.state.selectedNote} />
      </div>
    );
  }
}

module.exports = NotesApp;
