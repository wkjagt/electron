import React from "react";

var {Component} = React;

class Editor extends Component {
  render() {
    return(
      <div id="editor">
        <textarea defaultValue={this.props.content} />
      </div>
    );
  }
}

module.exports = Editor;
