import React from "react";
import NotesActions from "../actions/NotesActions"
import CreationForm from "./CreationForm.react";

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
    if(this.state.creatingNotebook) {
      return(<CreationForm key="notebookCreationForm" placeholder="Create new notebook" callback={this._handleAddNotebook.bind(this)}/>);
    } else if(this.state.creatingNote) {
      return(<CreationForm key="noteCreationForm" placeholder="Create new note" callback={this._handleAddNote.bind(this)}/>);
    }
  }

  _handleCreationButtonClick(type) {
    if(this.state.creatingNotebook && type == "notebook" || this.state.creatingNote && type == "note") {
      this.setState({creatingNotebook: false, creatingNote: false});
      return;
    }
    this.setState({creatingNotebook: type == "notebook", creatingNote: type == "note"});
  }

  _handleAddNotebook(e) {
    e.preventDefault();
    NotesActions.createNotebook(e.target.getElementsByTagName("input")[0].value);
    this.setState({creatingNotebook: false, creatingNote: false});
  }

  _handleAddNote(e) {
    e.preventDefault();
    NotesActions.createNote(e.target.getElementsByTagName("input")[0].value);
    this.setState({creatingNotebook: false, creatingNote: false});
  }

  render() {
    return(
      <div>
        <header className="toolbar toolbar-header">
          <h1 className="title">Espresso</h1>
          <div className="toolbar-actions">
            <div className="btn-group">
              <button onClick={this.handleCreateNotebook} className="btn btn-default" title="Create notebook">
                <span className="icon icon-book" />
              </button>
            </div>
            <div className="btn-group">
              <button onClick={this.handleCreateNote} className="btn btn-default" title="Create note">
                <span className="icon icon-doc-text" />
              </button>
            </div>
          </div>
        </header>
        {this._creationForm()}
      </div>
    );
  }
}

module.exports = AppHeader;
