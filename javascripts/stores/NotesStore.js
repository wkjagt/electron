import {EventEmitter} from 'fbemitter';
import AppDispatcher from '../dispatcher/AppDispatcher';

class NotesStore extends EventEmitter {
  constructor(props) {
    super(props);
    AppDispatcher.register((action) => {
      switch(action.actionType) {
        case "select_notebook": return this.selectNotebook(action.notebook);
        case("select_note"): return this.selectNote(action.note);
        case("delete_note"): return this.deleteNote(action.note);
        case("update_note"): return this.updateNote(action.title, action.content);
        case("create_note"): return this.createNote(action.newNoteName);
        case("create_notebook"): return this.createNotebook(action.newNotebookName);
      }
    });

    this._notes = {
      personal: [
        {
          name: "groceries",
          content: "milk, eggs",
          tags: ["tag1, tag2"]
        },
        {
          name: "to do",
          content: "buy stuff",
          tags: ["tag1, tag2"]
        },

      ],
      work: [
        {
          name: "todo",
          content: "foo bar",
          tags: ["tag1"]
        }
      ]
    };
    this.selectNotebook(Object.keys(this._notes)[0]);
  }

  selectNotebook(notebook) {
    if(notebook != this._selectedNotebook) {
      this._selectedNotebook = notebook;
      this._selectedNote = this._notes[this._selectedNotebook][0];
      this.emit("change");
    }
  }

  selectNote(note) {
    if(note != this._selectedNote) {
      this._selectedNote = note;
      this.emit("change");
    }
  }

  deleteNote(toDelete) {
    for(var note of this._notes[this._selectedNotebook]) {
      if(toDelete != note) continue;

      let index = this._notes[this._selectedNotebook].indexOf(note);
      this._notes[this._selectedNotebook].splice(index, 1);
    }
    this.emit("change");
  }

  updateNote(title, content) {
    this._selectedNote.name = title;
    this._selectedNote.content = content;
    this.emit("change");
  }

  createNotebook(newNotebookName) {
    this._notes[newNotebookName] = [
      {
        name: "New note",
        content: "",
        tags: []
      }
    ];
    this.selectNotebook(newNotebookName);
  }

  createNote(newNoteName) {
    let newNote = {
      name: newNoteName,
      content: "",
      tags: []
    }
    this._notes[this._selectedNotebook].push(newNote);
    this.selectNote(newNote);
  }

  getAllNotes() {
    return this._notes;
  }

  selectedNotebook() {
    return this._selectedNotebook;
  }

  selectedNote() {
    return this._selectedNote;
  }

  addChangeListener(callback) {
    this.addListener("change", callback);
  }

  removeChangeListener(callback) {
    this.removeListener("change", callback);
  }
}

module.exports = new NotesStore();
