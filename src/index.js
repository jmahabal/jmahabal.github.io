import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import Home from './components/Home';
import Resume from './components/Resume';
import Projects from './components/Projects';
import styles from './styles/main.scss';

// for images
// https://stackoverflow.com/questions/29421409/how-to-load-all-files-in-a-directory-using-webpack-without-require-statements
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./public/portfolio/resized/', true, /\.(jpg|png|gif)$/));

ReactDOM.render(
  <Router>
    <Home exact path="/" />
    <Resume path="/resume" />
    <Projects path="/projects" />
  </Router>,
  document.getElementById('index')
);
