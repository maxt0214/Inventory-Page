import React from 'react';

export class InputArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='inline_block'>
        <label>{this.props.label}</label>
        <input type="text" placeholder='Enter Text' onChange={e => this.props.onInput(this.props.label, e.target.value)}/>
      </div>
    );
  }
}

export class LabelArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='inline_block'>
        <label>{this.props.label}</label>
        <label>{this.props.text}</label>
      </div>
    );
  }
}