import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Resume extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Resume.
        <Link to="/"><button>Back Home</button></Link>
      </div>
    )
  }
}

export default Resume;