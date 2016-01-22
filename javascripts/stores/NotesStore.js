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
        }
      ],
      work: [
        {
          name: "todo",
          content: "foo bar",
          tags: ["tag1"]
        }
      ]
    };
    this._selectedNotebook = Object.keys(this._notes)[0];
    this._selectedNote = this._notes[this._selectedNotebook][0];
  }

  selectNotebook(notebook) {
    if(notebook != this._selectedNotebook) {
      this._selectedNotebook = notebook;
      this.emit("change");
    }
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
  }
});

module.exports = store;
