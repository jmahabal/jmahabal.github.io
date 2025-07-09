import { type ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

import { Span, H1, Text } from './ui/Typography'
import { SocialIcon } from './ui/Icons'

interface HistoryItemProps {
  children: ReactNode
  className?: string
}

const HistoryItem = ({ children, className = '' }: HistoryItemProps) => {
  return (
    <Text className={cn('font-mono text-[18px] mt-2 mb-2', className)}>
      {children}
    </Text>
  )
}

interface SeparatorProps {
  children: ReactNode
  className?: string
}

const Separator = ({ children, className = '' }: SeparatorProps) => {
  return <Span className={cn('text-[12px] px-3', className)}>{children}</Span>
}

interface TextInternalLinkProps {
  children: ReactNode
  className?: string
}

const TextInternalLink = ({
  children,
  className = '',
}: TextInternalLinkProps) => {
  return (
    <div className={cn('inline-block text-[18px] font-mono', className)}>
      {children}
    </div>
  )
}

interface TextLinkProps {
  href: string
  target?: string
  rel?: string
  children: ReactNode
  className?: string
}

const TextLink = ({
  href,
  target,
  rel,
  children,
  className = '',
}: TextLinkProps) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn('underline underline-offset-2 decoration-1', className)}
    >
      {children}
    </a>
  )
}

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

interface BlushIllutrationProps {
  alt: string
  src: string
  className?: string
}

const BlushIllutration = ({
  alt,
  src,
  className = '',
}: BlushIllutrationProps) => {
  return (
    <img
      alt={alt}
      src={src}
      className={cn('h-[600px] w-auto object-contain', className)}
    />
  )
}

interface PageProps {
  children: ReactNode
  className?: string
}

const Page = ({ children, className = '' }: PageProps) => {
  return (
    <div
      className={cn(
        'flex w-full min-h-screen bg-cover bg-no-repeat items-center justify-center font-sans',
        className,
      )}
      style={{
        background: changeColor(),
      }}
    >
      {children}
    </div>
  )
}

interface IllustrationContainerProps {
  children: ReactNode
  className?: string
}

const IllustrationContainer = ({
  children,
  className = '',
}: IllustrationContainerProps) => {
  return (
    <div className={cn('translate-x-4 max-w-[300px] h-[600px]', className)}>
      {children}
    </div>
  )
}

const Home = () => {
  useEffect(() => {
    console.log('Thank you to Shreeya Wagh for the beautiful illustration.')
  }, [])

  return (
    <Page>
      <IllustrationContainer>
        <BlushIllutration alt="Hello!" src="/jay-illus.png" />
      </IllustrationContainer>
      <div
        className="p-8 text-white max-w-[500px] h-full rounded bg-white/10"
        role="main"
      >
        <H1 className="mb-2">Hi, I’m Jay.</H1>
        <HistoryItem>
          I most recently worked as a Design Engineer at 💸{' '}
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
        </HistoryItem>
        <HistoryItem>I have two cats, 🐈‍⬛ Chance and 🐈 Xena.</HistoryItem>
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

        <div className="my-8 flex items-center justify-center gap-4">
          <a
            href="https://www.github.com/jmahabal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block h-6 w-6 text-white hover:text-gray-300 transition-colors"
            aria-label="Github"
          >
            {<SocialIcon icon="github" />}
          </a>
          <a
            href="https://www.linkedin.com/in/jmahabal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block h-6 w-6 text-white hover:text-gray-300 transition-colors"
            aria-label="LinkedIn"
          >
            {<SocialIcon icon="linkedin" />}
          </a>
          <a
            href="https://www.instagram.com/jmahabal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block h-6 w-6 text-white hover:text-gray-300 transition-colors"
            aria-label="Instagram"
          >
            {<SocialIcon icon="instagram" />}
          </a>
          <a
            href="https://www.twitter.com/jaymahabal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block h-6 w-6 text-white hover:text-gray-300 transition-colors"
            aria-label="Twitter"
          >
            {<SocialIcon icon="twitter" />}
          </a>
          <a
            href="mailto:jmahabal+website@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block h-6 w-6 text-white hover:text-gray-300 transition-colors"
            aria-label="Email"
          >
            {<SocialIcon icon="email" />}
          </a>
        </div>
        <div id="links" className="flex items-center justify-center">
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
    </Page>
  )
}

export default Home
