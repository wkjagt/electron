import AppDispatcher from '../dispatcher/AppDispatcher';

var NotesActions = {
  selectNotebook: (notebook) => {
    AppDispatcher.dispatch({
      actionType: "select_notebook",
      notebook: notebook
    });
  },

  selectNote: (note) => {
    AppDispatcher.dispatch({
      actionType: "select_note",
      note: note
    });
  }
}

module.exports = NotesActions;
