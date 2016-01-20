import React from "react";
import Notebooks from "./NoteBooks.react";
import Notes from "./Notes.react";
import Editor from "./Editor.react";
import NotesStore from "../stores/NotesStore";

var {Component} = React;

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = NotesStore.getAllNotes();
  }

  componentDidMount() {
    NotesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    NotesStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(NotesStore.getAllNotes());
  }

  render() {
    return (
      <div className="flex-container">
        <Notebooks />
        <Notes />
        <Editor content="haha" />
      </div>
    );
  }
}

module.exports = NotesApp;
