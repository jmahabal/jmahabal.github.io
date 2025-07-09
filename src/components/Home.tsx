import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { H1 } from './ui/Typography'
import { IconLink, TextLink, TextInternalLink } from './ui/Navigation'

const Home = () => {
  useEffect(() => {
    console.log('Thank you to Shreeya Wagh for the beautiful illustration.')
  }, [])

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-no-repeat px-8 font-sans font-light sm:px-0"
      style={{
        background: 'linear-gradient(45deg, rgb(0, 160, 249), rgb(4, 6, 154))',
      }}
    >
      <div className="hidden h-[600px] max-w-[300px] translate-x-4 sm:block">
        <img
          alt="Hello!"
          src="/jay-illus.png"
          className="h-[600px] w-auto object-contain"
        />
      </div>
      <div
        className="h-full max-w-[464px] rounded bg-white/10 p-8 font-mono text-[18px] text-white"
        role="main"
      >
        <H1 className="mb-2">Hi, I’m Jay.</H1>
        <div className="flex flex-col gap-3 text-[16px]">
          <div>
            I most recently worked as a Design Engineer at 💸{' '}
            <TextLink
              href="https://www.moderntreasury.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Modern Treasury
            </TextLink>
            .
          </div>
          <div>
            Before that I worked on design systems at 🥬{' '}
            <TextLink
              href="http://www.lattice.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lattice
            </TextLink>
            {', frontend engineering at 🍎 '}
            <TextLink
              href="http://www.apple.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple
            </TextLink>
            {', '}
            and creative technology at 🍄‍🟫{' '}
            <TextLink
              href="http://www.akqa.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              AKQA
            </TextLink>
            .
          </div>
          <div>I have two cats, 🐈‍⬛ Chance and 🐈 Xena.</div>
          <div>
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
          </div>
        </div>

        <div className="my-8 flex items-center justify-center gap-4">
          <IconLink
            href="https://www.github.com/jmahabal"
            icon="github"
            label="Github"
          />
          <IconLink
            href="https://www.linkedin.com/in/jmahabal"
            icon="linkedin"
            label="LinkedIn"
          />
          <IconLink
            href="https://www.instagram.com/jmahabal"
            icon="instagram"
            label="Instagram"
          />
          <IconLink
            href="https://www.twitter.com/jaymahabal"
            icon="twitter"
            label="Twitter"
          />
          <IconLink
            href="mailto:jmahabal+website@gmail.com"
            icon="email"
            label="Email"
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <TextInternalLink>
            <Link to="/projects">Projects</Link>
          </TextInternalLink>
          <TextInternalLink>
            <Link to="/talks">Talks</Link>
          </TextInternalLink>
          <TextInternalLink>
            <Link to="/writing">Writing</Link>
          </TextInternalLink>
          <TextInternalLink>
            <Link to="/resume">Resume</Link>
          </TextInternalLink>
        </div>
      </div>
    </div>
  )
}

export default Home
