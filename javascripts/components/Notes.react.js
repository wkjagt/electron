import React from "react";
import NoteListItem from "./NoteListItem.react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class Notes extends Component {
  render() {
    let selectedNotebook = this.props.data.selectedNotebook;
    let notes = this.props.data.notes[selectedNotebook];
    let selectedNote = this.props.data.selectedNote;

    let noteNodes = notes.map((note) => {
      let selected = note.name == selectedNote.name;
      return(<NoteListItem key={note.name} note={note} selected={selected} />);
    });

    return(
      <div id="notes" className="row">
        <h2>{this.props.data.selectedNotebook}</h2>
        <ul>
          {noteNodes}
        </ul>
        <form onSubmit={this._handleAddNoteClick.bind(this)}>
          <input type="text" ref="newNoteName" placeholder="Create note" />
          <input type="submit" value="add" />
        </form>
      </div>
    );
  }

  _handleAddNoteClick(event) {
    let newNoteName = this.refs.newNoteName.value;
    NotesActions.createNote(newNoteName);
  }
}

module.exports = Notes;
