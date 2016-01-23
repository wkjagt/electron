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
    let handler = this._handleChange.bind(this);
    return(
      <div id="editor">
        <form>
          <div>
            <input type="text" value={note.name} ref="title" onChange={handler} />
          </div>
          <div>
            <textarea value={note.content} ref="content" onChange={handler} />
          </div>
        </form>
      </div>
    );
  }

  _handleChange(event) {
    let title = this.refs.title.value;
    let content = this.refs.content.value;

    NotesActions.updateNote(title, content);
  }
}

module.exports = Editor;
