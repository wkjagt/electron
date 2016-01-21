import React from "react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class NotebookListItem extends Component {
  render() {
    let notebook = this.props.notebook;
    let selectedClass = this.props.selected ? "selected" : "";
    return(
      <li>
        <a href="#" className={selectedClass} onClick={() => NotesActions.selectNotebook(notebook)}>{notebook}</a>
      </li>
    );
  }
}

module.exports = NotebookListItem;
