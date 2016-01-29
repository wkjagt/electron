import React from "react";
import NotesActions from "../actions/NotesActions"
import NoteContentEditor from "./NoteContentEditor.react";

var {Component} = React;

class NoteEditor extends Component {
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
    let handler = this._handleChange.bind(this);

    if(note) {
      return(
        <form>
          <div className="form-group">
            <input id="noteTitleInput" className="form-control" type="text" value={note.name} ref="title" onChange={handler} />
          </div>
          <div className="form-group">
            <NoteContentEditor onChange={handler} note={note} ref="contentEditor"/>
          </div>
        </form>
      );
    } else {
      return(
        <div>no note</div>
      );
    }
  }

  _handleChange() {
    let title = this.refs.title.value;
    let content = this.refs.contentEditor.state.note.content;

    NotesActions.updateNote(title, content);
  }
}

module.exports = NoteEditor;
