import React from "react";
import Notebooks from "./notebooks"
import Notes from "./notes"
import Editor from "./editor"

var {Component} = React;

class App extends Component {
  render() {
    return (
      <div className="flex-container">
        <Notebooks />
        <Notes />
        <Editor />
      </div>
    );
  }
}

module.exports = App;
