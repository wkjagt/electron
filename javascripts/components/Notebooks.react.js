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
      <div id="notebooks" className="row">
        <h2>Notebooks</h2>
        <ul>
          {notebooks}
        </ul>
        <form onSubmit={this._handleAddNotebookClick.bind(this)}>
          <input type="text" ref="newNotebookName" placeholder="Create notebook" />
          <input type="submit" value="add" />
        </form>
      </div>
    );
  }

  _handleAddNotebookClick(event) {
    let newNotebookName = this.refs.newNotebookName.value;
    this.refs.newNotebookName.value = "";
    NotesActions.createNotebook(newNotebookName);
  }
}

module.exports = Notebooks;
