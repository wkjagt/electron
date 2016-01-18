require('../less/main.less');
import React from "react";

class MyComponent extends React.Component {
  render() {
    return (
      <div className="myDiv">
        Hello Electron!!!
      </div>
    );
  }
}

React.render(<MyComponent />, document.getElementById('content'));
