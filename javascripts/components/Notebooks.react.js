import React from "react";
import NotebookListItem from "./NotebookListItem.react";

var {Component} = React;

class Notebooks extends Component {
  render() {
    Object.keys(this.props.notes);
    let notebooks = Object.keys(this.props.notes).map((notebook) => {
      let selected = this.props.selectedNotebook == notebook;
      return(<NotebookListItem notebook={notebook} selected={selected} key={notebook}/>);
    });
    return(
      <div id="notebooks" className="resizable">
        <ul>
          {notebooks}
        </ul>
      </div>
    );
  }
}

module.exports = Notebooks;
