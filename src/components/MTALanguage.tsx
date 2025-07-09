import { type ReactNode } from 'react'
import { cn } from '../utils/cn'
import { Page, OneColumn } from './ui/Layout'
import { HomeLink } from './ui/Navigation'

interface MTALanguageContainerProps {
  children: ReactNode
  className?: string
}

const MTALanguageContainer = ({
  children,
  className = '',
}: MTALanguageContainerProps) => {
  return <div className={cn('p-4 md:px-16', className)}>{children}</div>
}

interface MTALanguageImageProps {
  src: string
  alt?: string
  className?: string
}

const MTALanguageImage = ({
  src,
  alt = '',
  className = '',
}: MTALanguageImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('max-h-[800px] border border-black', className)}
    />
  )
}

interface TextContainerProps {
  children: ReactNode
  className?: string
}

const TextContainer = ({ children, className = '' }: TextContainerProps) => {
  return <div className={cn('mx-auto max-w-[60ch]', className)}>{children}</div>
}

const MTALanguage = () => {
  return (
    <Page>
      <OneColumn>
        <MTALanguageContainer>
          <MTALanguageImage src="/mta-language.png" />
        </MTALanguageContainer>
        <TextContainer>
          <HomeLink />
        </TextContainer>
      </OneColumn>
    </Page>
  )
}

export default MTALanguage
