import { useState } from 'react'
import { Link } from 'react-router-dom'
import FontFeatureSettings, {
  toFontFeatureSettings,
} from './FontFeatureSettings'
import { H1, H2, P } from './ui/Typography'

type SlideLink =
  | { kind: 'internal'; to: string; label: string }
  | { kind: 'external'; href: string; label: string }

interface Slide {
  title: string
  subtitle?: string
  note?: string
  links?: SlideLink[]
  showFontFeatures?: boolean
  lead?: boolean
}

const slides: Slide[] = [
  {
    title: 'Portfolio review',
    subtitle: 'Jay Mahabal',
    note: 'The story I want to tell is that as I grew more comfortable with my craft and in seniority, I moved from thinking about how to build great experiences myself, and towards how could I “scale quality”.',
  },
  {
    title: 'If we want to talk tech...',
    lead: true,
  },
  {
    title: 'Component Rewrite',
    note: 'This is a design system component, but it best captures the professional scope of my work and my approach to working cross-functionally.',
    links: [
      {
        kind: 'internal',
        to: '/writing/table',
        label: 'DataTable',
      },
    ],
  },
  {
    title: 'If we want to go deep into the details...',
    lead: true,
  },
  {
    title: 'Growing a UX Writing Practice',
    note: 'I was lucky enough to work with some amazing content designers at AKQA and Apple, who taught me to look for things I now can’t unsee. I’ve been, with mixed success, trying to emulate them ever since.',
    links: [
      {
        kind: 'external',
        href: 'https://claude.com',
        label: 'Claude',
      },
      {
        kind: 'external',
        href: 'https://tech.lattice.com/article/growing-a-ux-writing-practice',
        label: 'Lattice Tech Blog',
      },
    ],
  },
  {
    title: 'Research to Production',
    links: [
      {
        kind: 'external',
        href: 'https://observablehq.com/@jmahabal/-/collection/variable-fonts',
        label: 'Variable Fonts',
      },
      {
        kind: 'external',
        href: 'https://rsms.me/inter/#features',
        label: 'Inter',
      },
    ],
    note: 'I started being more curious about fonts in 2019. It started as an interest, but I was excited to apply it in practice (somewhat) in my job recently.',
    showFontFeatures: true,
  },
  {
    title: 'If we want to talk about product sense...',
    lead: true,
  },
  {
    title: 'Edit or Die',
    note: 'This is my most recent side project, but because it’s only a side project, I don’t think it reflects my professional capabilities.',
    links: [
      {
        kind: 'external',
        href: 'https://www.edit-or-die.com/',
        label: 'Edit or Die',
      },
    ],
  },
]

const linkUnderlineClassName = 'underline decoration-1 underline-offset-2'

const linkClassName = `${linkUnderlineClassName} transition-colors hover:text-gray-600`

const externalLinkClassName =
  "transition-colors hover:text-gray-600 after:ml-1 after:inline-block after:text-[0.75em] after:content-['↗︎']"

const SlideLinkContent = ({ link }: { link: SlideLink }) => {
  if (link.kind === 'internal') {
    return (
      <Link to={link.to} className={linkClassName}>
        {link.label}
      </Link>
    )
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={externalLinkClassName}
    >
      <span className={linkUnderlineClassName}>{link.label}</span>
    </a>
  )
}

const FontFeatureSpecimen = () => {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/80 px-3.5 py-3">
      <p className="text-[15px] font-medium leading-tight text-gray-900">
        Illustration draft
      </p>
      <p className="mt-1 text-[12px] leading-tight text-gray-500">
        Guild 11 · 3 files · updated 6:09 · Opens after 16:40
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          className="cursor-pointer rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[12px] font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-gray-900 px-2.5 py-1 text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
        >
          Assign
        </button>
        <span className="ml-auto text-[11px] text-gray-500">Straße 49</span>
      </div>
    </div>
  )
}

const FontFeatureSlideCard = ({ slide }: { slide: Slide }) => {
  const [enabled, setEnabled] = useState<Set<string>>(() => new Set())
  const fontFeatureSettings = toFontFeatureSettings(enabled)

  return (
    <div
      className="relative flex h-[420px] flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-8 md:p-12 [&_*]:![font-family:InterVariable,sans-serif]"
      style={{
        fontFamily: 'InterVariable, sans-serif',
        fontFeatureSettings,
      }}
    >
      <div className="flex flex-1 flex-col justify-center">
        <H2 className="text-[40px]">{slide.title}</H2>
        {slide.links?.length ? (
          <div className="mt-3 flex flex-col gap-1 text-[20px] text-gray-600">
            {slide.links.map((link) => (
              <P
                key={link.kind === 'internal' ? link.to : link.href}
                className="text-[20px]"
              >
                <SlideLinkContent link={link} />
              </P>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <FontFeatureSettings enabled={enabled} onChange={setEnabled} />
        <div className="min-w-0 flex-1">
          <FontFeatureSpecimen />
        </div>
      </div>
    </div>
  )
}

const PortfolioReview = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 font-light md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-28">
        {slides.map((slide) => (
          <div
            key={slide.title}
            className="flex flex-col gap-4 md:flex-row md:gap-6"
          >
            {slide.showFontFeatures ? (
              <FontFeatureSlideCard slide={slide} />
            ) : (
              <div className="flex h-[420px] flex-1 flex-col justify-center rounded-lg border border-gray-200 bg-white p-8 md:p-12">
                {slide.lead ? (
                  <P className="text-[24px] font-sans text-gray-600">
                    {slide.title}
                  </P>
                ) : slide.links?.length ? (
                  <H2 className="text-[40px]">{slide.title}</H2>
                ) : (
                  <H1 className="text-[48px]">{slide.title}</H1>
                )}
                {slide.subtitle ? (
                  <P className="mt-3 text-[24px] font-sans text-gray-600">
                    {slide.subtitle}
                  </P>
                ) : null}
                {slide.links?.length ? (
                  <div className="mt-3 flex flex-col gap-1 text-[20px] font-sans text-gray-600">
                    {slide.links.map((link) => (
                      <P
                        key={link.kind === 'internal' ? link.to : link.href}
                        className="text-[20px] font-sans"
                      >
                        <SlideLinkContent link={link} />
                      </P>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
            <aside className="w-full shrink-0 md:w-56 lg:w-64">
              {slide.note ? (
                <p className="pt-2 font-mono text-[14px] leading-[1.25] text-gray-700">
                  {slide.note}
                </p>
              ) : null}
            </aside>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PortfolioReview
