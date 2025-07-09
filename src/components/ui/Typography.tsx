import { cn } from '../../utils/cn'

const sansserif = 'Inter, sans-serif'
const serif = 'Tangerine, serif'
const monospace = 'Inconsolata, monospace'

const TYPOGRAPHY_VARIANTS = {
  h1: 'text-[36px] font-sans max-w-[55ch]',
  h2: 'text-[30px] font-sans max-w-[55ch]',
  h3: 'text-[24px] font-sans max-w-[55ch]',
  h4: 'text-[18px] font-sans max-w-[55ch]',
  h6: 'text-[16px] font-sans max-w-[55ch]',
  p: 'text-[14px] font-mono max-w-[55ch]',
  span: 'text-[14px] font-sans max-w-[55ch]',
  text: 'text-[14px] font-sans max-w-[55ch]',
} as const

const H1 = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn(TYPOGRAPHY_VARIANTS.h1, className)} {...props}>
    {children}
  </h1>
)

const H2 = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn(TYPOGRAPHY_VARIANTS.h2, className)} {...props}>
    {children}
  </h2>
)

const H3 = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn(TYPOGRAPHY_VARIANTS.h3, className)} {...props}>
    {children}
  </h3>
)

const H4 = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className={cn(TYPOGRAPHY_VARIANTS.h4, className)} {...props}>
    {children}
  </h4>
)

const H6 = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h6 className={cn(TYPOGRAPHY_VARIANTS.h6, className)} {...props}>
    {children}
  </h6>
)

const P = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn(TYPOGRAPHY_VARIANTS.p, className)} {...props}>
    {children}
  </p>
)

const Span = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(TYPOGRAPHY_VARIANTS.span, className)} {...props}>
    {children}
  </span>
)

const Text = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(TYPOGRAPHY_VARIANTS.text, className)} {...props}>
    {children}
  </span>
)

export { H1, H2, H3, H4, H6, P, Span, Text, sansserif, serif, monospace }
