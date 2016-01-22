import React from "react";

var {Component} = React;

class Notes extends Component {
  render() {
    let selectedNotebook = this.props.data.selectedNotebook;
    let notes = this.props.data.notes[selectedNotebook];
    let selectedNote = this.props.data.selectedNote;

    let noteNodes = notes.map((note) => {
      let selected = note.name == selectedNote.name;
      let selectedClass = selected ? "selected" : "";
      return(<li key={note.name} className={selectedClass}>{note.name}</li>);
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
