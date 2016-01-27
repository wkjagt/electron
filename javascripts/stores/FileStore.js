import {EventEmitter} from 'fbemitter';
import NotesActions from "../actions/NotesActions"

class FileStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.readFiles();
  }

  readFiles() {
    let notes = {
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
    NotesActions.loadNotes(notes);
  }
}

module.exports = new FileStore();
