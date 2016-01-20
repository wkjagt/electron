import React from "react";

var {Component} = React;

class Notebooks extends Component {
  render() {
    return(
      <div id="notebooks" className="resizable">
        <ul>
          <li>personal notes</li>
          <li>work notes</li>
        </ul>
      </div>
    );
  }
}

module.exports = Notebooks;
