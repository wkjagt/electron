import AppDispatcher from '../dispatcher/AppDispatcher';

var NotesActions = {
  selectNotebook: (notebook) => {
    AppDispatcher.dispatch({
      actionType: "select_notebook",
      notebook: notebook
    });
  }
}

module.exports = NotesActions;
