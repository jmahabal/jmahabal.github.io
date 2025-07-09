import { type ReactNode } from 'react'
import { cn } from '../../utils/cn'

const sansserif = 'Inter, sans-serif'
const serif = 'Tangerine, serif'
const monospace = 'Inconsolata, monospace'

interface TextProps {
  children: ReactNode
  className?: string
  [key: string]: unknown
}

export const Text = ({ children, className = '', ...props }: TextProps) => {
  return (
    <span
      className={cn('font-normal font-sans block m-0', className)}
      {...props}
    >
      {children}
    </span>
  )
}

interface H1Props {
  children: ReactNode
  className?: string
  [key: string]: unknown
}

const H1 = ({ children, className = '', ...props }: H1Props) => {
  return (
    <h1
      className={cn(
        'text-[36px] font-normal font-sans leading-relaxed max-w-[55ch] block m-0',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

interface H2Props {
  children: ReactNode
  className?: string
  [key: string]: unknown
}

const H2 = ({ children, className = '', ...props }: H2Props) => {
  return (
    <h2
      className={cn(
        'text-[30px] font-normal font-sans leading-relaxed max-w-[55ch] block m-0',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

interface H3Props {
  children: ReactNode
  className?: string
  [key: string]: unknown
}

const H3 = ({ children, className = '', ...props }: H3Props) => {
  return (
    <h3
      className={cn(
        'text-[24px] font-normal font-sans leading-relaxed max-w-[55ch] block m-0',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

interface H4Props {
  children: ReactNode
  className?: string
  [key: string]: unknown
}

const H4 = ({ children, className = '', ...props }: H4Props) => {
  return (
    <h4
      className={cn(
        'text-[18px] font-normal font-sans leading-relaxed max-w-[55ch] block m-0',
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  )
}

interface H6Props {
  children: ReactNode
  className?: string
  [key: string]: unknown
}

const H6 = ({ children, className = '', ...props }: H6Props) => {
  return (
    <h6
      className={cn(
        'text-[16px] font-normal font-sans leading-relaxed max-w-[55ch] block m-0',
        className,
      )}
      {...props}
    >
      {children}
    </h6>
  )
}

interface PProps {
  children: ReactNode
  className?: string
  [key: string]: unknown
}

const P = ({ children, className = '', ...props }: PProps) => {
  return (
    <p
      className={cn('text-[14px] font-mono max-w-[55ch]', className)}
      {...props}
    >
      {children}
    </p>
  )
}

interface SpanProps {
  children: ReactNode
  className?: string
  [key: string]: unknown
}

const Span = ({ children, className = '', ...props }: SpanProps) => {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  )
}

export { H1, H2, H3, H4, H6, P, Span, sansserif, serif, monospace }
