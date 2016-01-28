import React from "react";
import ReactDOM from "react-dom";
import MediumEditor from "medium-editor";

class NoteContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.note,
    };
  }

  createMediumConfig() {
    return {
      buttonLabels: "fontawesome"
    }
  }

  componentDidMount() {
    this.medium = new MediumEditor(ReactDOM.findDOMNode(this), this.createMediumConfig());
    this.medium.subscribe('editableInput', this._handleChange.bind(this));
  }

  shouldComponentUpdate(nextProps, nextState) {
  //   console.log("shouldComponentUpdate test: " + this.state.note.name + " == " + nextProps.note.name)
  //   return this.state.note.name != nextProps.note.name;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      note: nextProps.note
    });
  }

  componentWillUnmount() {
    this.medium.deactivate();
  }

  render() {
    return (
      <div
        onChange={this._handleChange.bind(this)}
        id="contentEditor"
        contentEditable="true"
        dangerouslySetInnerHTML={{__html:this.state.note.content}}
      />
    );
  }

  _handleChange(event) {
    this.state.note.content = event.target.innerHTML
    this.setState({ note: this.state.note });
    this.props.onChange();
  }
}

module.exports = NoteContentEditor;
