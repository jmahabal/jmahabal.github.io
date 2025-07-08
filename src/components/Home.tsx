import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Span, H1, Text } from './ui/Typography'
import { SocialIcon } from './ui/Icons'

const HistoryItem = styled(Text)`
  font-family: 'Inconsolata';
  font-size: 18px;
  margin-top: 8px;
  margin-bottom: 8px;
`

const Separator = styled(Span)`
  font-size: 12px;
  padding-left: 12px;
  padding-right: 12px;
`

const TextInternalLink = styled.div`
  display: inline-block;
  font-size: 18px;
  font-family: Inconsolata;
  & > a {
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
  }
`

const TextLink = styled.a`
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
`

const initialColorCount = Math.round(Math.random() * 1000)

let lastX = initialColorCount
let lastY = -initialColorCount
const sinBuffer = 150

const changeColor = () => {
  let x = lastX + 1
  let y = lastY - 1

  x = Math.round((Math.sin(x / sinBuffer) / 2 + 0.5) * 255)
  y = Math.round((Math.sin(y / sinBuffer) / 2 + 0.5) * 255)

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
  height: 500px;
`

const Home = () => {
  React.useEffect(() => {
    console.log('Thank you to Shreeya Wagh for the beautiful illustration.')
  }, [])

  return (
    <Page>
      <Container>
        <IllustrationContainer>
          <BlushIllutration alt="Hello!" src="/jay-illus.png" />
        </IllustrationContainer>
        <div className="description-container" role="main">
          <H1 className="mb-2">Hi, I’m Jay.</H1>
          <HistoryItem>
            I’m currently a Design Engineer at 💸{' '}
            <TextLink
              href="https://www.moderntreasury.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Modern Treasury
            </TextLink>
            .
          </HistoryItem>
          <HistoryItem>
            I most recently worked on design systems at 🥬{' '}
            <TextLink
              href="http://www.lattice.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lattice
            </TextLink>
            {'. Before that, I was a UI engineer at 🍎 '}
            <TextLink
              href="http://www.apple.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple
            </TextLink>{' '}
            and a creative technologist at 🍄‍🟫{' '}
            <TextLink
              href="http://www.akqa.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              AKQA
            </TextLink>
            .
          </HistoryItem>
          <HistoryItem>I have two cats, 🐈‍⬛ Chance and 🐈 Xena.</HistoryItem>
          {/* <HistoryItem>
            I graduated from 🐻{' '}
            <TextLink
              href="http://www.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UC Berkeley

            </TextLink>{' '}
            with a Bachelor of Arts in 📊{' '}
            <TextLink
              href="https://math.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mathematics
            </TextLink>
            {' '}and a minor in 🗺️{' '}
            <TextLink
              href="https://nature.berkeley.edu/advising/minors/gist"
              target="_blank"
              rel="noopener noreferrer"
            >
              GIST
            </TextLink>
            .
            , and a certificate in 🆕{' '}
            <TextLink
              href="http://bcnm.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Media

            </TextLink>
            .
          </HistoryItem> */}
          <HistoryItem>
            I love to 📚{' '}
            <TextLink
              href="https://www.goodreads.com/user/show/62322015-jay"
              target="_blank"
              rel="noopener noreferrer"
            >
              read books
            </TextLink>
            , 🃏 play board games (current favorites are{' '}
            <TextLink
              href="https://boardgamegeek.com/boardgame/822/carcassonne"
              target="_blank"
              rel="noopener noreferrer"
            >
              Carcassonne
            </TextLink>{' '}
            &{' '}
            <TextLink
              href="https://boardgamegeek.com/boardgame/31260/agricola"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agricola
            </TextLink>
            ), and take 📷 photos.
          </HistoryItem>

          <div className="my-8 flex items-center justify-center">
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
          <div id="links">
            <TextInternalLink>
              <Link to="/projects">Projects</Link>
            </TextInternalLink>
            <Separator> </Separator>
            <TextInternalLink>
              <Link to="/talks">Talks</Link>
            </TextInternalLink>
            <Separator> </Separator>
            <TextInternalLink>
              <Link to="/writing">Writing</Link>
            </TextInternalLink>
            <Separator> </Separator>
            <TextInternalLink>
              <Link to="/resume">Resume</Link>
            </TextInternalLink>
          </div>
        </div>
      </Container>
    </Page>
  )
}

export default Home
