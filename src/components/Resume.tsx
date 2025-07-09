import { type ReactNode } from 'react'
import { cn } from '../utils/cn'
import { Page, OneColumn, Container } from './ui/Layout'
import { HomeLink } from './ui/Navigation'
import { H1 } from './ui/Typography'

interface ResumeContainerProps {
  children: ReactNode
  className?: string
}

const ResumeContainer = ({
  children,
  className = '',
}: ResumeContainerProps) => {
  return (
    <div className={cn('my-10 border border-black', className)}>{children}</div>
  )
}

interface ResumeImageProps {
  src: string
  alt?: string
  className?: string
}

const ResumeImage = ({ src, alt = '', className = '' }: ResumeImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('w-full max-w-[800px]', className)}
    />
  )
}

const Resume = () => {
  return (
    <Page>
      <Container>
        <H1>Resume</H1>
        <OneColumn>
          <ResumeContainer>
            <ResumeImage src="/resume/resume_jaymahabal.jpg" />
          </ResumeContainer>
        </OneColumn>
        <HomeLink />
      </Container>
    </Page>
  )
}

export default Resume
