import {EventEmitter} from 'fbemitter';
import AppDispatcher from '../dispatcher/AppDispatcher';

class NotesStore extends EventEmitter {
  constructor(props) {
    super(props);
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

let store = new NotesStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case "select_notebook":
      store.selectNotebook(action.notebook);
      break;
    case("select_note"):
      store.selectNote(action.note);
      break;
    case("update_note"):
      store.updateNote(action.title, action.content);
      break;
    case("create_note"):
      store.createNote(action.newNoteName);
      break
    case("create_notebook"):
      store.createNotebook(action.newNotebookName);
      break
  }
});

module.exports = store;
