import React from "react";
import NoteListItem from "./NoteListItem.react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class Notes extends Component {
  render() {
    let selectedNotebook = this.props.data.selectedNotebook;
    let notes = this.props.data.notes[selectedNotebook] || [];
    let selectedNote = this.props.data.selectedNote;

    let noteNodes = notes.map((note) => {
      let selected = note.name == selectedNote.name;
      return(<NoteListItem key={note.name} note={note} selected={selected} />);
    });

    return(
      <nav className="nav-group">
        <h5 className="nav-group-title">Notes in "{selectedNotebook}"</h5>
        <ul className="list-group">
          {noteNodes}
        </ul>
        <form onSubmit={this._handleAddNoteClick.bind(this)}>
          <input type="text" ref="newNoteName" placeholder="Create note" />
          <input type="submit" value="add" />
        </form>
      </nav>
    );
  }

  _handleAddNoteClick(event) {
    event.preventDefault();

    let newNoteName = this.refs.newNoteName.value;
    this.refs.newNoteName.value = "";
    NotesActions.createNote(newNoteName);
  }
}

module.exports = Notes;
