import { type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { SocialIcon } from './Icons'

// IconLink Component
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
        'inline-block h-6 w-6 text-white hover:text-gray-300 transition-colors',
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
      className={cn('underline underline-offset-2 decoration-1', className)}
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
    <div className={cn('text-[16px] font-mono', className)}>{children}</div>
  )
}
