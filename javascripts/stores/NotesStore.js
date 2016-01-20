import { EventEmitter } from 'fbemitter';
import AppDispatcher from '../dispatcher/AppDispatcher';

class NotesStore extends EventEmitter {
  static getAllNotes() {
    return {
      personal: [
        {
          content: "bla bla",
          tags: ["tag1, tag2"]
        }
      ]
    };
  }

  static addChangeListener() {
  }
}

module.exports = NotesStore;
