import React from "react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.note.content
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      content: nextProps.note.content
    });
  }

  render() {
    return(
      <div id="editor">
        <textarea value={this.state.content} onChange={this._handleChange.bind(this)} />
      </div>
    );
  }

  _handleChange(event) {
    NotesActions.updateNote(event.target.value);
  }
}

module.exports = Editor;
