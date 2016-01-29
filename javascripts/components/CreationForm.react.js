import React from "react";
var {Component} = React;

class CreationForm extends React.Component {
  render() {
    return(
      <form key={this.props.key} onSubmit={this.props.callback}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder={this.props.placeholder}
            ref={(input) => { if (input != null) { input.focus(); }}}
            onKeyDown={this.props.keydown}
          />
        </div>
      </form>
    );
  }
}

module.exports = CreationForm;
