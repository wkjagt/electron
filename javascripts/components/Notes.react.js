import React from "react";
import NoteListItem from "./NoteListItem.react";

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
      <div id="notes">
        <ul>
          {noteNodes}
        </ul>
      </div>
    );
  }
}

module.exports = Notes;
