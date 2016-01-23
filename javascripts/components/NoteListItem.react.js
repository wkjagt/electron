import React from "react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class NoteListItem extends Component {
  render() {
    let selectedClass = this.props.selected ? "selected" : "";
    return(
      <li>
        <a href="#" className={selectedClass} onClick={this._handleSelectNoteClick.bind(this)}>{this.props.note.name}</a>
      </li>
    );
  }

  _handleSelectNoteClick() {
    NotesActions.selectNote(this.props.note)
  }
}

module.exports = NoteListItem;
