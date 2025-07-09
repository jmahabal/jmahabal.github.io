import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { Arrow } from './Icons'
import { SocialIcon } from './Icons'

interface IconLinkProps {
  href: string
  icon: string
  label: string
  className?: string
}

export const IconLink = ({
  href,
  icon,
  label,
  className = '',
}: IconLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-block size-6 text-white transition-colors hover:text-gray-300',
        className,
      )}
      aria-label={label}
    >
      <SocialIcon icon={icon} />
    </a>
  )
}

// TextLink Component
interface TextLinkProps {
  href: string
  target?: string
  rel?: string
  children: ReactNode
  className?: string
}

export const TextLink = ({
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
      className={cn('underline decoration-1 underline-offset-2', className)}
    >
      {children}
    </a>
  )
}

// TextInternalLink Component
interface TextInternalLinkProps {
  children: ReactNode
  className?: string
}

export const TextInternalLink = ({
  children,
  className = '',
}: TextInternalLinkProps) => {
  return (
    <div className={cn('font-mono text-[16px]', className)}>{children}</div>
  )
}

export const HomeLink = () => {
  return (
    <Link
      to="/"
      className="group flex items-center text-[20px] text-black no-underline"
    >
      <div className="rotate-180 transition-transform group-hover:-translate-x-1">
        <Arrow />
      </div>
      Home
    </Link>
  )
}

export const WritingLink = ({ className }: { className?: string }) => {
  return (
    <Link
      to="/writing"
      className={cn(
        'group flex items-center text-[20px] text-black no-underline',
        className,
      )}
    >
      <div className="rotate-180 transition-transform group-hover:-translate-x-1">
        <Arrow />
      </div>
      Writing
    </Link>
  )
}
