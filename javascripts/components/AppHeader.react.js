import React from "react";
import NotesActions from "../actions/NotesActions"
import CreationForm from "./CreationForm.react";
import classnames from "classnames";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateNotebook = () => { this._handleCreationButtonClick("notebook"); }
    this.handleCreateNote = () => { this._handleCreationButtonClick("note"); }
    this.state = {
      creatingNotebook: false,
      creatingNote: false
    };
  }

  _creationForm() {
    let keydown = this._handleEscapeKey.bind(this);
    if(this.state.creatingNotebook) {
      return(<CreationForm key="notebookCreationForm" placeholder="Create new notebook" callback={this._handleAddNotebook.bind(this)} keydown={keydown}/>);
    } else if(this.state.creatingNote) {
      return(<CreationForm key="noteCreationForm" placeholder="Create new note" callback={this._handleAddNote.bind(this)} keydown={keydown}/>);
    }
  }

  _handleCreationButtonClick(type) {
    if(this.state.creatingNotebook && type == "notebook" || this.state.creatingNote && type == "note") {
      this.closeForms();
      return;
    }
    this.setState({creatingNotebook: type == "notebook", creatingNote: type == "note"});
  }

  _handleAddNotebook(e) {
    e.preventDefault();
    NotesActions.createNotebook(e.target.getElementsByTagName("input")[0].value);
    this.closeForms();
  }

  _handleAddNote(e) {
    e.preventDefault();
    NotesActions.createNote(e.target.getElementsByTagName("input")[0].value);
    this.closeForms();
  }

  _handleEscapeKey(e) {
    if(e.keyCode == 27) {
      this.closeForms();
    }
  }

  closeForms() {
    this.setState({creatingNotebook: false, creatingNote: false});
  }

  render() {
    return(
      <div>
        <header className="toolbar toolbar-header">
          <h1 className="title">Espresso</h1>
          <div className="toolbar-actions">
            {this.createNotebookButton()}{this.createNoteButton()}
          </div>
        </header>
        {this._creationForm()}
      </div>
    );
  }

  createNotebookButton() {
    let active = this.state.creatingNotebook;
    return (
      <div className="btn-group">
        <button
          onClick={this.handleCreateNotebook}
          className={classnames("btn", "btn-default", {"active": active})}
          title="Create notebook"
        >
          <span className="icon icon-book" />
        </button>
      </div>
    );
  }

  createNoteButton() {
    let active = this.state.creatingNote;

    return(
      <div className="btn-group">
        <button
          onClick={this.handleCreateNote}
          className={classnames("btn", "btn-default", {"active": active})}
          title="Create note"
        >
          <span className="icon icon-doc-text" />
        </button>
      </div>
    );
  }
}

module.exports = AppHeader;
