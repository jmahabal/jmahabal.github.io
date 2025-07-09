import { type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export const contentMaxWidth = 768

interface TwoColumnProps {
  children: ReactNode
  className?: string
}

const TwoColumn = ({ children, className = '' }: TwoColumnProps) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {children}
    </div>
  )
}

interface OneColumnProps {
  children: ReactNode
  className?: string
}

const OneColumn = ({ children, className = '' }: OneColumnProps) => {
  return <div className={cn('flex flex-col', className)}>{children}</div>
}

interface ContainerProps {
  children: ReactNode
  className?: string
  [key: string]: unknown
}

const Container = ({ children, className = '', ...props }: ContainerProps) => {
  return (
    <div
      className={cn(
        'grid flex-col w-full max-w-4xl p-16 lg:p-16 md:p-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
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
        'flex items-center justify-center px-4 mx-auto max-w-4xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export { Page, TwoColumn, OneColumn, Container }
