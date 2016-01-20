import React from "react";
import Notebooks from "./NoteBooks.react";
import Notes from "./Notes.react";
import Editor from "./Editor.react";

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
