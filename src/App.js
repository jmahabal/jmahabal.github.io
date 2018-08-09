import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Resume from './components/Resume';
import Projects from './components/Projects';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          This header should be everywhere.
        </div>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/resume" component={Resume} />
          <Route path="/projects" component={Projects} />
        </div>
      </div>
    )
  }
}

export default App;