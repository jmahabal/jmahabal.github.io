import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import { RoughNotation } from 'react-rough-notation'
import Bowser from 'bowser'

import { usePrefersReducedMotion } from './utils'
import { Span, H1, H4, monospace } from './ui/Typography'
import { SocialIcon } from './ui/Icons'

const HistoryItem = ({ children }) => (
  <H4 mt={3} mb={3} font={monospace}>
    {children}
  </H4>
)

const browser = Bowser.getParser(window.navigator.userAgent)
const platformType = browser.getPlatformType()
const isDesktop = platformType === 'desktop'

const TextLink = ({ children }) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [highlightLink, setHighlightLink] = React.useState(false)

  return (
    <RoughNotation
      type="highlight"
      show={prefersReducedMotion ? false : highlightLink}
      iterations={1}
      animationDuration={250}
      onMouseEnter={() => (isDesktop ? setHighlightLink(true) : null)}
      onMouseLeave={() => (isDesktop ? setHighlightLink(false) : null)}
      color="rgba(230, 126, 34, 1.0)"
    >
      {children}
    </RoughNotation>
  )
}

const IconLink = ({ children }) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [highlightLink, setHighlightLink] = React.useState(false)

  return (
    <RoughNotation
      type="circle"
      show={prefersReducedMotion ? false : highlightLink}
      iterations={1}
      animationDuration={250}
      onMouseEnter={() => (isDesktop ? setHighlightLink(true) : null)}
      onMouseLeave={() => (isDesktop ? setHighlightLink(false) : null)}
      color="rgba(230, 126, 34, 1.0)"
      strokeWidth="2"
    >
      {children}
    </RoughNotation>
  )
}

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

const BlushIllutration = styled.img`
  height: 500px;
`

const Page = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  background: ${changeColor};
`

const Container = styled.div`
  max-width: 80ch;
  display: flex;
  @media only screen and (max-width: 768px) {
    img {
      display: none;
    }
  }
`

const IllustrationContainer = styled.div`
  transform: translate(-40px, 15px);
  max-width: 250px;
`

const Home = () => {
  React.useEffect(() => {
    console.log('Thank you to Shreeya Wagh for the beautiful illustration.')
  }, [])

  return (
    <Page>
      <Container>
        <IllustrationContainer>
          <BlushIllutration alt="Hello!" src="./public/jay-illus.png" />
        </IllustrationContainer>
        <div className="description-container" role="main">
          <H1 mb={2}>Hi, I’m Jay.</H1>
          <HistoryItem>
            I’m currently a UI engineer at{' '}
            <TextLink>
              <a
                href="https://lattice.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lattice
              </a>
            </TextLink>
            .
          </HistoryItem>
          <HistoryItem>
            I was previously a front-end engineer at{' '}
            <TextLink>
              <a
                href="http://www.apple.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple
              </a>
            </TextLink>{' '}
            and before that a creative technologist at{' '}
            <TextLink>
              <a
                href="http://www.akqa.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AKQA
              </a>
            </TextLink>
            .
          </HistoryItem>
          <HistoryItem>
            I graduated from{' '}
            <TextLink>
              <a
                href="http://www.berkeley.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                UC Berkeley
              </a>
            </TextLink>{' '}
            with a Bachelor of Arts in{' '}
            <TextLink>
              <a
                href="https://math.berkeley.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mathematics
              </a>
            </TextLink>
            , a minor in{' '}
            <TextLink>
              <a
                href="https://nature.berkeley.edu/advising/minors/gist"
                target="_blank"
                rel="noopener noreferrer"
              >
                GIST
              </a>
            </TextLink>
            , and a certificate in{' '}
            <TextLink>
              <a
                href="http://bcnm.berkeley.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                New Media
              </a>
            </TextLink>
            .
          </HistoryItem>
          <HistoryItem>
            I love to{' '}
            <TextLink>
              <a
                href="https://www.goodreads.com/user/show/62322015-jay"
                target="_blank"
                rel="noopener noreferrer"
              >
                read books
              </a>
            </TextLink>
            , play board games (current favorites are{' '}
            <TextLink>
              <a
                href="https://boardgamegeek.com/boardgame/68448/7-wonders"
                target="_blank"
                rel="noopener noreferrer"
              >
                7 Wonders
              </a>
            </TextLink>{' '}
            &{' '}
            <TextLink>
              <a
                href="https://boardgamegeek.com/boardgame/31260/agricola"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agricola
              </a>
            </TextLink>
            ), and take photos.
          </HistoryItem>
          <div id="links">
            <TextLink>
              {' '}
              <Link to="/projects">
                <H4 font={monospace}>Projects</H4>
              </Link>
            </TextLink>
            <Span pl={3} pr={3}>
              //
            </Span>
            <TextLink>
              {' '}
              <Link to="/talks">
                <H4 font={monospace}>Talks</H4>
              </Link>
            </TextLink>
            <Span pl={3} pr={3}>
              //
            </Span>
            <TextLink>
              {' '}
              <Link to="/resume">
                <H4 font={monospace}>Resume</H4>
              </Link>
            </TextLink>
          </div>
          <div className="swing-below">
            <IconLink>
              <a
                href="https://www.github.com/jmahabal"
                target="_blank"
                rel="noopener noreferrer"
                className="home-icon"
                aria-label="Github"
              >
                {<SocialIcon icon="github" />}
              </a>
            </IconLink>
            <IconLink>
              <a
                href="https://www.linkedin.com/in/jmahabal"
                target="_blank"
                rel="noopener noreferrer"
                className="home-icon"
                aria-label="LinkedIn"
              >
                {<SocialIcon icon="linkedin" />}
              </a>
            </IconLink>
            <IconLink>
              <a
                href="https://www.instagram.com/jmahabal"
                target="_blank"
                rel="noopener noreferrer"
                className="home-icon"
                aria-label="Instagram"
              >
                {<SocialIcon icon="instagram" />}
              </a>
            </IconLink>
            <IconLink>
              <a
                href="https://www.twitter.com/jaymahabal"
                target="_blank"
                rel="noopener noreferrer"
                className="home-icon"
                aria-label="Twitter"
              >
                {<SocialIcon icon="twitter" />}
              </a>
            </IconLink>
            <IconLink>
              <a
                href="mailto:jmahabal+website@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="home-icon"
                aria-label="Email"
              >
                {<SocialIcon icon="email" />}
              </a>
            </IconLink>
          </div>
        </div>
      </Container>
    </Page>
  )
}

export default Home
