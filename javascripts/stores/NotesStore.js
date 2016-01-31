import {EventEmitter} from 'fbemitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import NotesActions from "../actions/NotesActions"
import shortid from "shortid";

class NotesStore extends EventEmitter {
  constructor(props) {
    super(props);
    AppDispatcher.register((action) => {
      switch(action.actionType) {
        case "load_notebooks": return this.loadNotebooks(action.notebooks);
        case "select_notebook": return this.selectNotebook(action.notebook);
        case "select_note": return this.selectNote(action.note);
        case "delete_note": return this.deleteNote(action.note);
        case "update_note": return this.updateNote(action.title, action.content);
        case "create_note": return this.createNote(action.newNoteName);
        case "create_notebook": return this.createNotebook(action.newNotebookName);
      }
    });

    this.notebooks = [];
    this.selectedNotebookId = null;
    this.selectedNoteId = null;
  }

  loadNotebooks(notebooks) {
    this.notebooks = notebooks;
    this.selectNotebook(notebooks[0]);
  }

  selectNotebook(notebook) {
    if(notebook.id != this.selectedNotebookId) {
      this.selectedNotebookId = notebook.id;
      if(notebook.notes.length > 0) {
        this.selectNote(notebook.notes[0]);
      }
    }
  }

  selectNote(note) {
    if(note.id != this.selectedNoteId) {
      this.selectedNoteId = note.id
      this.emit("change");
    }
  }

  deleteNote(toDelete) {
    for(var notebook of this.notebooks) {
      for(var note of notebook.notes) {
        if(toDelete.id == note.id) {
          notebook.notes.splice(notebook.notes.indexOf(note), 1);
        }
      }
    }
    this.emit("change");
  }

  updateNote(title, content) {
    let note = this.getSelectedNote();
    note.name = title;
    note.content = content;
    this.emit("change");
  }

  createNotebook(newNotebookName) {
    let newNotebook = {
      id: shortid.generate(),
      name: newNotebookName,
      notes: []
    };
    this.notebooks.push(newNotebook);
    this.selectNotebook(newNotebook);

    this.createNote("New note");
  }

  createNote(newNoteName) {
    let notebook = this.getSelectedNotebook();
    let newNote = {
      id: shortid.generate(),
      name: newNoteName,
      content: "",
      tags: []
    }
    notebook.notes.push(newNote);
    this.selectNote(newNote);
  }

  getSelectedNotebook() {
    for(let notebook of this.notebooks) {
      if(notebook.id == this.selectedNotebookId) {
        return notebook;
      }
    }
  }

  getSelectedNote() {
    let notebook = this.getSelectedNotebook();
    if(!notebook) { return; }

    for(let note of notebook.notes) {
      if(note.id == this.selectedNoteId) {
        return note;
      }
    }
  }

  addChangeListener(callback) {
    this.addListener("change", callback);
  }

  removeChangeListener(callback) {
    this.removeListener("change", callback);
  }
}

module.exports = new NotesStore();
