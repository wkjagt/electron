require('../less/main.less');

import React from "react";
import ReactDOM from "react-dom";
import Notebooks from "./notebooks"
import Notes from "./notes"
import Editor from "./editor"

class App extends React.Component {
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

ReactDOM.render(<App />, document.getElementById('content'));
