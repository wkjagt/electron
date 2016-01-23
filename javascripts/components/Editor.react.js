import React from "react";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.note,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      note: nextProps.note
    });
  }

  render() {
    let note = this.state.note;
    return(
      <div id="editor">
        <h2>{note.name}</h2>
        <textarea value={note.content} onChange={this._handleChange.bind(this)} />
      </div>
    );
  }

  _handleChange(event) {
    NotesActions.updateNote(event.target.value);
  }
}

module.exports = Editor;
