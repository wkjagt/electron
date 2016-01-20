import React from "react";
import Notebooks from "./NoteBooks.react";
import Notes from "./Notes.react";
import Editor from "./Editor.react";
import NotesStore from "../stores/NotesStore";

var {Component} = React;

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: NotesStore.getAllNotes()
    };
  }

  componentDidMount() {
    NotesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    NotesStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      notes: NotesStore.getAllNotes()
    });
  }

  render() {
    return (
      <div className="flex-container">
        <Notebooks notes={this.state["notes"]}/>
        <Notes notes={this.state["notes"]}/>
        <Editor />
      </div>
    );
  }
}

module.exports = NotesApp;
