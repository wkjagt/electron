require('../less/main.less');

import React from "react";
import ReactDOM from "react-dom"
import NotesApp from "./components/NotesApp.react"

ReactDOM.render(<NotesApp />, document.getElementById('content'));
