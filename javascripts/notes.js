import React from "react";

var {Component} = React;

class Notes extends Component {
  render() {
    return(
      <div id="notes">
        <ul>
          <li>note 1</li>
          <li>note 2</li>
        </ul>
      </div>
    );
  }
}

module.exports = Notes;
