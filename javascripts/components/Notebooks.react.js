import React from "react";

var {Component} = React;

class Notebooks extends Component {
  render() {
    Object.keys(this.props.notes);
    let items = Object.keys(this.props.notes).map((notebook) => {
      return(<li>{notebook}</li>);
    });
    return(
      <div id="notebooks" className="resizable">
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}

module.exports = Notebooks;
