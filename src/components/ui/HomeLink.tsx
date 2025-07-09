import { type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Link } from 'react-router-dom'

import { Arrow } from './Icons'

interface LinkContainerProps {
  children: ReactNode
  className?: string
}

const LinkContainer = ({ children, className = '' }: LinkContainerProps) => {
  return <div className={cn(className)}>{children}</div>
}

export const HomeLink = () => {
  return (
    <LinkContainer>
      <Link
        to="/"
        className="flex items-center text-black text-[20px] no-underline group"
      >
        <div className="rotate-180 transition-transform duration-250 group-hover:-translate-x-1">
          <Arrow />
        </div>
        Home
      </Link>
    </LinkContainer>
  )
}
