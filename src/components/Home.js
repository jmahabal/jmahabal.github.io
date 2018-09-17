import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Span, P, H1, H2, H3, H4, H6 } from './ui/Typography';
import { SocialIcon } from './ui/Icons';


const HistoryItem = ({children}) => (
    <H4 mt={3} mb={3}>{children}</H4>
)


class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="box">
            <div className="description-container" role="main">
                <H1 mb={2}>Hi, I’m Jay.</H1>
                <HistoryItem>
                    I’m currently a front-end engineer at <a href="http://www.apple.com/" target="_blank" rel="noopener">Apple</a>.
                </HistoryItem>
                <HistoryItem>
                    I was previously a creative technologist at <a href="http://www.akqa.com/" target="_blank" rel="noopener">AKQA</a>, a data journalist at <a href="http://www.h2o.ai/" target="_blank" rel="noopener">H2O.ai</a>, an intern at the <a href="http://youarehere.cc/" target="_blank" rel="noopener">MIT Media Lab</a>, and as a system administrator at the <a href="https://iris.eecs.berkeley.edu//05-helpdesk/" target="_blank" rel="noopener">UC Berkeley EECS Department</a>.
                </HistoryItem>
                <HistoryItem>
                    I graduated from <a href="http://www.berkeley.edu/" target="_blank" rel="noopener">UC Berkeley</a> in 2016 with a degree in <a href="https://math.berkeley.edu/" target="_blank" rel="noopener">Mathematics</a>, a minor in <a href="https://nature.berkeley.edu/advising/minors/gist" target="_blank" rel="noopener">GIST</a>, a certificate in <a href="http://bcnm.berkeley.edu/" target="_blank" rel="noopener">New Media</a>, and a desire to create great data visualization.
                </HistoryItem>
                <HistoryItem>
                    I love to read books, play board games (current favorites are <a href="https://boardgamegeek.com/boardgame/2651/power-grid" target="_blank" rel="noopener">Power Grid</a> & <a href="https://boardgamegeek.com/boardgame/31260/agricola" target="_blank" rel="noopener">Agricola</a>), and take photos.
                </HistoryItem>
            
                <div id="links">
                    <Link to="/projects"><H4>Projects</H4></Link>
                    <Span pl={3} pr={3}>//</Span>
                    <Link to="/resume"><H4>Resume</H4></Link>
                </div>
                <div className="swing-below">
                    <a href="https://www.github.com/jmahabal" target="_blank" rel="noopener" className="icon" aria-label="Github">
                        {<SocialIcon icon='github' />}
                    </a>
                    <a href="https://www.linkedin.com/in/jmahabal" target="_blank" rel="noopener" className="icon" aria-label="LinkedIn">
                        {<SocialIcon icon='linkedin' />}
                    </a>
                    <a href="https://www.instagram.com/jmahabal" target="_blank" rel="noopener" className="icon" aria-label="Instagram">
                        {<SocialIcon icon='instagram' />}
                    </a>
                    <a href="https://www.twitter.com/jaymahabal" target="_blank" rel="noopener" className="icon" aria-label="Twitter">
                        {<SocialIcon icon='twitter' />}
                    </a>
                    <a href="mailto:jmahabal+website@gmail.com" target="_blank" rel="noopener" className="icon" aria-label="Email">
                        {<SocialIcon icon='email' />}
                    </a>
                </div>
            </div>
        </div>
    )
  }
}

export default Home;