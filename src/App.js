import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Resume from './components/Resume';
import Projects from './components/Projects';

// for images
// https://stackoverflow.com/questions/29421409/how-to-load-all-files-in-a-directory-using-webpack-without-require-statements
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./public/portfolio/resized/', true, /\.(jpg|png|gif)$/));

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/resume" component={Resume} />
        <Route path="/projects" component={Projects} />
      </div>
    )
  }
}

export default App;