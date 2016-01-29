import React from "react";
import NotebookListItem from "./NotebookListItem.react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class Notebooks extends Component {
  render() {
    let notebooks = this.props.data.notebooks;
    let selectedNotebookId = this.props.data.selectedNotebookId;

    let notebookNodes = notebooks.map((notebook) => {
      let selected = selectedNotebookId == notebook.id;
      return(<NotebookListItem notebook={notebook} selected={selected} key={notebook.id}/>);
    });
    return(
      <div>
        <nav className="nav-group">
          <h5 className="nav-group-title">Notebooks</h5>
          {notebookNodes}
        </nav>
      </div>
    );
  }
}

module.exports = Notebooks;
