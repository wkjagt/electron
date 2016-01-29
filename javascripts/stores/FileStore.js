import {EventEmitter} from 'fbemitter';
import NotesActions from "../actions/NotesActions"
import shortid from "shortid";

class FileStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.readFiles();
  }

  readFiles() {
    let notebooks = [
      {
        id: shortid.generate(),
        name: "personal",
        notes: [
          {
            id: shortid.generate(),
            name: "groceries",
            content: "<p><ul><li>milk</li><li>eggs</li></ul></p>",
            tags: ["tag1, tag2"]
          },
          {
            id: shortid.generate(),
            name: "to do",
            content: "<h2>buy stuff</h2>",
            tags: ["tag1, tag2"]
          },
        ]
      },
      {
        id: shortid.generate(),
        name: "work notes",
        notes: [
          {
            id: shortid.generate(),
            name: "todo",
            content: "<p>foo bar</p>",
            tags: ["tag1"]
          }
        ]
      }
    ];
    NotesActions.loadNotebooks(notebooks);
  }
}

module.exports = new FileStore();
