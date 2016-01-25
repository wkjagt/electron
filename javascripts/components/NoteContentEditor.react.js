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

  componentWillReceiveProps(nextProps) {
    this.setState({
      note: nextProps.note
    });
  }

  createMediumConfig() {
    return {
      buttonLabels: "fontawesome"
    }
  }

  componentDidMount() {
    this.medium = new MediumEditor(ReactDOM.findDOMNode(this), this.createMediumConfig());
    this.medium.onHideToolbar = function() {
      this.setState({ content: this.getDOMNode().innerHTML });
    }.bind(this);
    this.medium.subscribe('editableInput', this.props.onChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.note.name != nextProps.note.name;
  }

  componentWillUnmount() {
    this.medium.deactivate();
  }

  render() {
    return (
      <div
        id="contentEditor"
        contentEditable="true"
        dangerouslySetInnerHTML={{__html:this.state.note.content}}
      />
    );
  }
}

module.exports = NoteContentEditor;
