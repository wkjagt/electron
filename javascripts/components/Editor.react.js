import React from "react";

var {Component} = React;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.note.content
    }
  }

  render() {
    return(
      <div id="editor">
        <textarea value={this.state.content} onChange={this._onChange.bind(this)} />
      </div>
    );
  }

  _onChange(event) {
    this.setState({
      content: event.target.value
    });
  }

}

module.exports = Editor;
