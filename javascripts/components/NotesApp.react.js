import React from "react";
import Notebooks from "./NoteBooks.react";
import Notes from "./Notes.react";
import Editor from "./Editor.react";
import NotesStore from "../stores/NotesStore";

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
      selectNotebook: NotesStore.selectedNotebook()
    };
  }

  render() {
    return (
      <div className="flex-container">
        <Notebooks notes={this.state["notes"]} selectedNotebook={this.state["selectNotebook"]} />
        <Notes notes={this.state["notes"]}/>
        <Editor />
      </div>
    );
  }
}

module.exports = NotesApp;
