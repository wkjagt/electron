import React from "react";
import NotebookListItem from "./NotebookListItem.react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class Notebooks extends Component {
  render() {
    let notes = this.props.data.notes;
    let notebookNames = Object.keys(notes);
    let selectedNotebookName = this.props.data.selectedNotebook;

    let notebooks = notebookNames.map((name) => {
      let selected = selectedNotebookName == name;
      return(<NotebookListItem notebook={name} selected={selected} key={name}/>);
    });
    return(
      <div>
        <nav className="nav-group">
          <h5 className="nav-group-title">Notebooks</h5>
          {notebooks}
        </nav>
      </div>
    );
  }
}

module.exports = Notebooks;
