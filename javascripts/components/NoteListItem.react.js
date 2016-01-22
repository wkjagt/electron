import React from "react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class NoteListItem extends Component {
  render() {
    let note = this.props.note;
    console.log(note)
    let selectedClass = this.props.selected ? "selected" : "";
    return(
      <li>
        <a href="#" className={selectedClass} onClick={() => NotesActions.selectNote(note)}>{note.name}</a>
      </li>
    );
  }
}

module.exports = NoteListItem;
