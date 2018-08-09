import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Projects extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Home.
        <Link to="/resume"><button>To Resume</button></Link>
      </div>
    )
  }
}

export default Projects;