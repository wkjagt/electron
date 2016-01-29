import React from "react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class NoteListItem extends Component {
  notePreview() {
    return this.props.note.content.replace(/<\/?[^>]+(>|$)/g, "");
  }

  render() {
    let className = (this.props.selected ? "selected " : "") + "list-group-item";
    // see http://stackoverflow.com/questions/5002111/javascript-how-to-strip-html-tags-from-string
    let preview = this.props.note.content.replace(/<\/?[^>]+(>|$)/g, "");
    return(
      <li className={className} onClick={this._handleSelectNoteClick.bind(this)}>
        <div className="media-body">
          <strong>{this.props.note.name}</strong>
          <span className="icon icon-cancel pull-right" onClick={this._handleDeleteNoteClick.bind(this)} />
          <p>{this.notePreview()}</p>
        </div>
      </li>
    );
  }

  _handleSelectNoteClick() {
    NotesActions.selectNote(this.props.note)
  }

  _handleDeleteNoteClick() {
    NotesActions.deleteNote(this.props.note)
  }
}

module.exports = NoteListItem;
