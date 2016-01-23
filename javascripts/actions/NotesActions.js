import AppDispatcher from '../dispatcher/AppDispatcher';

var NotesActions = {
  selectNotebook(notebook) {
    AppDispatcher.dispatch({
      actionType: "select_notebook",
      notebook: notebook
    });
  },

  selectNote(note) {
    AppDispatcher.dispatch({
      actionType: "select_note",
      note: note
    });
  },

  updateNote(newContent) {
    AppDispatcher.dispatch({
      actionType: "update_note",
      content: newContent
    });
  },

  createNotebook(newNotebookName) {
    AppDispatcher.dispatch({
      actionType: "create_notebook",
      newNotebookName: newNotebookName
    });
  },

  createNote(newNoteName) {
    AppDispatcher.dispatch({
      actionType: "create_note",
      newNoteName: newNoteName
    });
  }
}

module.exports = NotesActions;
