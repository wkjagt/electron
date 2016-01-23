import React from "react";
import NotebookListItem from "./NotebookListItem.react";

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
      <div id="notebooks" className="row">
        <h2>Notebooks</h2>
        <ul>
          {notebooks}
        </ul>
      </div>
    );
  }
}

module.exports = Notebooks;
