import React from "react";
import NotesActions from "../actions/NotesActions"
import NoteContentEditor from "./NoteContentEditor.react";

var {Component} = React;

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this._changeHandler = this._handleChange.bind(this);
    this.state = { note: this.props.note };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ note: nextProps.note });
  }

  render() {
    if(this.props.note) {
      return(
        <form>
          <input
            id="note-title-input"
            className="form-control"
            type="text" value={this.props.note.name}
            ref="title"
            onChange={this._changeHandler}
          />
          <div className="form-group">
            <NoteContentEditor onChange={this._changeHandler} note={this.props.note} ref="contentEditor"/>
          </div>
        </form>
      );
    } else {
      return(<div>no note</div>);
    }
  }

  _handleChange(e) {
    let title = this.refs.title.value;
    let content = this.refs.contentEditor.state.note.content;

    NotesActions.updateNote(title, content);
  }
}

module.exports = NoteEditor;
