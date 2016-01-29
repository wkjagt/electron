import React from "react";
import NoteListItem from "./NoteListItem.react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class Notes extends Component {
  render() {
    let notebook = this.props.notebook;
    let selectedNoteId = this.props.selectedNoteId;

    let noteNodes = notebook.notes.map((note) => {
      let selected = note.id == selectedNoteId;
      return(<NoteListItem key={note.id} note={note} selected={selected} />);
    });

    return(
      <nav className="nav-group">
        <h5 className="nav-group-title">Notes in "{notebook.name}"</h5>
        <ul className="list-group">{noteNodes}</ul>
      </nav>
    );
  }
}

module.exports = Notes;
