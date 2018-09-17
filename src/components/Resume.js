import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Resume extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img alt={this.props.imageDescription} src='./public/resume/resume_jaymahabal.jpg' />
      </div>
    )
  }
}

export default Resume;