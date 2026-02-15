import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200',
        secondary:
          'border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200',
        outline: 'text-slate-700 border-slate-200',
        location:
          'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, onClick, ...props }: BadgeProps) {
  const isInteractive = onClick !== undefined

  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        isInteractive &&
          'cursor-pointer print:cursor-default print:hover:bg-blue-100',
        className,
      )}
      onClick={onClick}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
