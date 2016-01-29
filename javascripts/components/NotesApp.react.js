import React from "react";
import Notebooks from "./NoteBooks.react";
import Notes from "./Notes.react";
import NoteEditor from "./NoteEditor.react";
import NotesStore from "../stores/NotesStore";
import FileStore from "../stores/FileStore";
import NotesActions from "../actions/NotesActions"

var {Component} = React;

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  componentDidMount() {
    NotesStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    NotesStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(this._getState());
  }

  _getState() {
    return {
      notes: NotesStore.getAllNotes(),
      selectedNotebook: NotesStore.selectedNotebook(),
      selectedNote: NotesStore.selectedNote(),
      creatingNotebook: false,
      creatingNote: false
    };
  }

  render() {
    let creationForm = this._creationForm();
    let _handleCreateNotebook = () => { this._handleCreationButtonClick("notebook"); }
    let _handleCreateNote = () => { this._handleCreationButtonClick("note"); }
    return (
      <div>
        <header className="toolbar toolbar-header">
          <h1 className="title">Espresso</h1>
          <div className="toolbar-actions">
            <div className="btn-group">
              <button onClick={_handleCreateNotebook} className="btn btn-default" title="Create notebook">
                <span className="icon icon-book" />
              </button>
            </div>
            <div className="btn-group">
              <button onClick={_handleCreateNote} className="btn btn-default" title="Create note">
                <span className="icon icon-doc-text" />
              </button>
            </div>
          </div>
        </header>
        {creationForm}
        <div className="window-content">
          <div className="pane-group">
            <div className="pane pane-sm sidebar">
              <Notebooks data={this.state} />
            </div>
            <div className="pane pane-sm sidebar">
              <Notes data={this.state} />
            </div>
            <div className="pane">
              <NoteEditor note={this.state.selectedNote} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  _creationForm() {
    if(this.state.creatingNotebook == this.state.creatingNote) return;
    let focus = (input) => { if (input != null) { input.focus(); }};

    if(this.state.creatingNotebook) {
      var key = "notebookCreationForm";
      var placeholder="Create new notebook";
      var callback = this._handleAddNotebook.bind(this);
    } else if(this.state.creatingNote) {
      var key = "noteCreationForm";
      var placeholder="Create new note";
      var callback = this._handleAddNote.bind(this);
    }
    return(
      <form key={key} onSubmit={callback}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder={placeholder}
            ref={focus}
          />
        </div>
      </form>
    );
  }

  _handleCreationButtonClick(type) {
    this.setState({creatingNotebook: type == "notebook", creatingNote: type == "note"});
  }

  _handleAddNotebook(e) {
    e.preventDefault();
    NotesActions.createNotebook(e.target.getElementsByTagName("input")[0].value);
  }

  _handleAddNote(e) {
    e.preventDefault();
    NotesActions.createNote(e.target.getElementsByTagName("input")[0].value);
  }
}

module.exports = NotesApp;
