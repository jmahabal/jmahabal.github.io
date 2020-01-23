import React, { Component } from 'react'
import { Link } from '@reach/router'

import { Span, H1, H4, monospace } from './ui/Typography'
import { SocialIcon } from './ui/Icons'

const HistoryItem = ({ children }) => (
  <H4 mt={3} mb={3} font={monospace}>
    {children}
  </H4>
)

const initialColorCount = Math.round(Math.random() * 1000, 10)

let lastX = initialColorCount
let lastY = -initialColorCount
const time = 250
const sinBuffer = 150

const changeColor = () => {
  let x = lastX + 1
  let y = lastY - 1

  x = Math.round((Math.sin(x / sinBuffer) / 2 + 0.5) * 255, 10)
  y = Math.round((Math.sin(y / sinBuffer) / 2 + 0.5) * 255, 10)

  lastX += 1
  lastY -= 1

  // const windowWidth =
  //   window.innerWidth ||
  //   document.documentElement.clientWidth ||
  //   document.body.clientWidth

  // if (windowWidth > 1200) {
  //   return 'linear-gradient(45deg, #f1c40f, #c0392b)'
  // } else if (windowWidth > 700) {
  //   return 'linear-gradient(45deg, #2ecc71, #16a085)'
  // }
  return 'linear-gradient(45deg, rgb(0, 160, 249), rgb(4, 6, 154))'

  // for interpolating between colors
  // return `linear-gradient(45deg, rgb(0, 160, ${y}), rgb(4, ${x}, 154))`;
}

class Home extends Component {
  componentDidMount() {
    document.querySelector('body').style.background = changeColor()
  }

  componentWillUnmount() {
    document.querySelector('body').style.background = null
  }

  render() {
    return (
      <div className="box">
        <div className="description-container" role="main">
          <H1 mb={2}>Hi, I’m Jay.</H1>
          <HistoryItem>
            I’m currently a UI engineer at{' '}
            <a
              href="https://lattice.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lattice
            </a>
            .
          </HistoryItem>
          <HistoryItem>
            I was previously a front-end engineer at{' '}
            <a
              href="http://www.apple.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple
            </a>{' '}
            and before that a creative technologist at{' '}
            <a
              href="http://www.akqa.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              AKQA
            </a>
            .
          </HistoryItem>
          <HistoryItem>
            I graduated from{' '}
            <a
              href="http://www.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UC Berkeley
            </a>{' '}
            with a Bachelor of Arts in{' '}
            <a
              href="https://math.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mathematics
            </a>
            , a minor in{' '}
            <a
              href="https://nature.berkeley.edu/advising/minors/gist"
              target="_blank"
              rel="noopener noreferrer"
            >
              GIST
            </a>
            , and a certificate in{' '}
            <a
              href="http://bcnm.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Media
            </a>
            .
          </HistoryItem>
          <HistoryItem>
            I love to{' '}
            <a
              href="https://www.goodreads.com/user/show/62322015-jay"
              target="_blank"
              rel="noopener noreferrer"
            >
              read books
            </a>
            , play board games (current favorites are{' '}
            <a
              href="https://boardgamegeek.com/boardgame/68448/7-wonders"
              target="_blank"
              rel="noopener noreferrer"
            >
              7 Wonders
            </a>{' '}
            &{' '}
            <a
              href="https://boardgamegeek.com/boardgame/31260/agricola"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agricola
            </a>
            ), and take photos.
          </HistoryItem>
          <div id="links">
            <Link to="/projects">
              <H4 font={monospace}>Projects</H4>
            </Link>
            <Span pl={3} pr={3}>
              //
            </Span>
            <Link to="/talks">
              <H4 font={monospace}>Talks</H4>
            </Link>
            <Span pl={3} pr={3}>
              //
            </Span>
            <Link to="/resume">
              <H4 font={monospace}>Resume</H4>
            </Link>
          </div>
          <div className="swing-below">
            <a
              href="https://www.github.com/jmahabal"
              target="_blank"
              rel="noopener noreferrer"
              className="home-icon"
              aria-label="Github"
            >
              {<SocialIcon icon="github" />}
            </a>
            <a
              href="https://www.linkedin.com/in/jmahabal"
              target="_blank"
              rel="noopener noreferrer"
              className="home-icon"
              aria-label="LinkedIn"
            >
              {<SocialIcon icon="linkedin" />}
            </a>
            <a
              href="https://www.instagram.com/jmahabal"
              target="_blank"
              rel="noopener noreferrer"
              className="home-icon"
              aria-label="Instagram"
            >
              {<SocialIcon icon="instagram" />}
            </a>
            <a
              href="https://www.twitter.com/jaymahabal"
              target="_blank"
              rel="noopener noreferrer"
              className="home-icon"
              aria-label="Twitter"
            >
              {<SocialIcon icon="twitter" />}
            </a>
            <a
              href="mailto:jmahabal+website@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="home-icon"
              aria-label="Email"
            >
              {<SocialIcon icon="email" />}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
