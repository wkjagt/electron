require('../less/main.less');
import React from "react";

class MyComponent extends React.Component {
  render() {
    return (
      <ul className="flex-container">
        <li className="flex-item">1</li>
        <li className="flex-item">2</li>
        <li className="flex-item">3</li>
        <li className="flex-item">4</li>
        <li className="flex-item">5</li>
        <li className="flex-item">6</li>
      </ul>
    );
  }
}

React.render(<MyComponent />, document.getElementById('content'));
