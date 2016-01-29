import React from "react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class NotebookListItem extends Component {
  render() {
    let notebook = this.props.notebook;
    let className = (this.props.selected ? "active " : "") + "nav-group-item";
    return(
      <span className={className} onClick={() => NotesActions.selectNotebook(notebook)}>
        <span className="icon icon-folder" />
        <span>{notebook.name}</span>
      </span>
    );
  }
}

module.exports = NotebookListItem;
