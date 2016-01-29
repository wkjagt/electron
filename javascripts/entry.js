require('../less/main.less');
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');
require('font-awesome/css/font-awesome.min.css');
require('../vendor/photon/dist/css/photon.css')

import React from "react";
import ReactDOM from "react-dom"
import NotesApp from "./components/NotesApp.react"

ReactDOM.render(<NotesApp />, document.getElementById('react-content'));
