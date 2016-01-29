import React from "react";
import Notebooks from "./NoteBooks.react";
import Notes from "./Notes.react";
import NoteEditor from "./NoteEditor.react";
import NotesStore from "../stores/NotesStore";
import FileStore from "../stores/FileStore";
import AppHeader from "./AppHeader.react";

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
      notebooks: NotesStore.notebooks,
      selectedNotebookId: NotesStore.selectedNotebookId,
      selectedNoteId: NotesStore.selectedNoteId,
    };
  }

  render() {
    return (
      <div>
        <AppHeader />
        <div className="window-content">
          <div className="pane-group">
            <div className="pane pane-sm sidebar">
              <Notebooks data={this.state} />
            </div>
            <div className="pane pane-sm sidebar">
              {this.notes()}
            </div>
            <div className="pane">
              <NoteEditor note={NotesStore.getSelectedNote()} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  notes() {
    let selectedNotebook = NotesStore.getSelectedNotebook();
    if(selectedNotebook) {
      return(
        <Notes
          notebook={selectedNotebook}
          selectedNoteId={NotesStore.selectedNoteId}
        />
      );
    }
  }
}

module.exports = NotesApp;
