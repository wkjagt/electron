import {EventEmitter} from 'fbemitter';
import AppDispatcher from '../dispatcher/AppDispatcher';

class NotesStore extends EventEmitter {
  constructor(props) {
    super(props);
    this._notes = {
      personal: [
        {
          content: "bla bla",
          tags: ["tag1, tag2"]
        }
      ],
      work: [
        {
          content: "foo bar",
          tags: ["tag1"]
        }
      ]
    };
    this._selectedNoteBook = Object.keys(this._notes)[0];
  }

  selectNotebook(notebook) {
    if(notebook != this._selectedNoteBook) {
      this._selectedNoteBook = notebook;
      this.emit("change");
    }
  }

  getAllNotes() {
    return this._notes;
  }

  selectedNotebook() {
    return this._selectedNoteBook;
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
