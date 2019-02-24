import React, { Component } from 'react';
import { Link } from '@reach/router';

import {
  Span, H1, H4, monospace,
} from './ui/Typography';
import { SocialIcon } from './ui/Icons';

const HistoryItem = ({ children }) => (
  <H4 mt={3} mb={3} font={monospace}>{children}</H4>
);

const initialColorCount = Math.round(Math.random() * 1000, 10);

let lastX = initialColorCount;
let lastY = -initialColorCount;
const time = 250;
const sinBuffer = 150;

const changeColor = () => {
  let x = lastX + 1;
  let y = lastY - 1;

  x = Math.round((Math.sin(x / sinBuffer) / 2 + 0.5) * 255, 10);
  y = Math.round((Math.sin(y / sinBuffer) / 2 + 0.5) * 255, 10);

  lastX += 1;
  lastY -= 1;

  return 'linear-gradient(45deg, rgb(0, 160, 249), rgb(4, 6, 154))';
//   return `linear-gradient(45deg, rgb(0, 160, ${y}), rgb(4, ${x}, 154))`;
};

class Home extends Component {
  componentDidMount() {
    document.querySelector('body').style.background = changeColor();
  }

  componentWillUnmount() {
    document.querySelector('body').style.background = null;
  }

  render() {
    return (
      <div className="box">
        <div className="description-container" role="main">
          <H1 mb={2}>Hi, I’m Jay.</H1>
          <HistoryItem>
            I’m currently a front-end engineer at{' '}<a href="http://www.apple.com/" target="_blank" rel="noopener noreferrer">Apple</a>.
          </HistoryItem>
          <HistoryItem>
            I was previously a creative technologist at{' '}<a href="http://www.akqa.com/" target="_blank" rel="noopener noreferrer">AKQA</a>, a data journalist at{' '}<a href="http://www.h2o.ai/" target="_blank" rel="noopener noreferrer">H2O.ai</a>, and an intern at the{' '}<a href="http://youarehere.cc/" target="_blank" rel="noopener noreferrer">MIT Media Lab</a>.
          </HistoryItem>
          <HistoryItem>
            I graduated from{' '}<a href="http://www.berkeley.edu/" target="_blank" rel="noopener noreferrer">UC Berkeley</a>{' '}with a Bachelor of Arts in{' '}<a href="https://math.berkeley.edu/" target="_blank" rel="noopener noreferrer">Mathematics</a>, a minor in{' '}<a href="https://nature.berkeley.edu/advising/minors/gist" target="_blank" rel="noopener noreferrer">GIST</a>, a certificate in{' '}<a href="http://bcnm.berkeley.edu/" target="_blank" rel="noopener noreferrer">New Media</a>, and a desire to create great data visualization.
          </HistoryItem>
          <HistoryItem>
            I love to read books, play board games (current favorites are{' '}<a href="https://boardgamegeek.com/boardgame/2651/power-grid" target="_blank" rel="noopener noreferrer">Power Grid</a>{' '}&{' '}<a href="https://boardgamegeek.com/boardgame/31260/agricola" target="_blank" rel="noopener noreferrer">Agricola</a>), and take photos.
          </HistoryItem>
          <div id="links">
            <Link to="/projects"><H4 font={monospace}>Projects</H4></Link>
            <Span pl={3} pr={3}>//</Span>
            <Link to="/resume"><H4 font={monospace}>Resume</H4></Link>
          </div>
          <div className="swing-below">
            <a href="https://www.github.com/jmahabal" target="_blank" rel="noopener noreferrer" className="icon" aria-label="Github">
              {<SocialIcon icon="github" />}
            </a>
            <a href="https://www.linkedin.com/in/jmahabal" target="_blank" rel="noopener noreferrer" className="icon" aria-label="LinkedIn">
              {<SocialIcon icon="linkedin" />}
            </a>
            <a href="https://www.instagram.com/jmahabal" target="_blank" rel="noopener noreferrer" className="icon" aria-label="Instagram">
              {<SocialIcon icon="instagram" />}
            </a>
            <a href="https://www.twitter.com/jaymahabal" target="_blank" rel="noopener noreferrer" className="icon" aria-label="Twitter">
              {<SocialIcon icon="twitter" />}
            </a>
            <a href="mailto:jmahabal+website@gmail.com" target="_blank" rel="noopener noreferrer" className="icon" aria-label="Email">
              {<SocialIcon icon="email" />}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
