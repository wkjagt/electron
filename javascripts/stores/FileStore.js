import {EventEmitter} from 'fbemitter';
import NotesActions from "../actions/NotesActions"
import AppDispatcher from '../dispatcher/AppDispatcher';
import shortid from "shortid";

const fileAccess = electron.remote.require("./javascripts/lib/FileAccess");

class FileStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.readFiles();
    AppDispatcher.register((action) => {
      switch(action.actionType) {
        case "save_notebook": return this.saveNotebook(action.newNotebook);
      }
    });
  }

  readFiles() {
    let notebooks = fileAccess.getNotebooks();
    // let notebooks = [
    //   {
    //     id: shortid.generate(),
    //     name: "personal",
    //     notes: [
    //       {
    //         id: shortid.generate(),
    //         name: "groceries",
    //         content: "<p><ul><li>milk</li><li>eggs</li></ul></p>",
    //         tags: ["tag1, tag2"]
    //       },
    //       {
    //         id: shortid.generate(),
    //         name: "to do",
    //         content: "<h2>buy stuff</h2>",
    //         tags: ["tag1, tag2"]
    //       },
    //     ]
    //   },
    //   {
    //     id: shortid.generate(),
    //     name: "work notes",
    //     notes: [
    //       {
    //         id: shortid.generate(),
    //         name: "todo",
    //         content: "<p>foo bar</p>",
    //         tags: ["tag1"]
    //       }
    //     ]
    //   }
    // ];
    NotesActions.loadNotebooks(notebooks.map(this.decomplectNotebook.bind(this)));
  }

  saveNotebook(notebook) {
    fileAccess.saveNotebook(notebook);
  }

  decomplectNotebook(notebook) {
    return {
      id: notebook.id,
      name: notebook.name,
      notes: notebook.notes.map((note) => {return this.decomplectNote(note, notebook)})
    };
  }

  decomplectNote(note, notebook) {
    return {
      id: note.id,
      name: note.name,
      content: note.content,
      notebook: notebook
    };
  }
}

module.exports = new FileStore();
