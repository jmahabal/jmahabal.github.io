import React from 'react'
import { H1, P } from '../../components/ui/Typography'
import { getTagLabel } from '../tags'
import { Person } from '../types'

interface IntroSlideProps {
  enabledTags: string[]
  people: Person[]
}

const IntroSlide: React.FC<IntroSlideProps> = ({ enabledTags, people }) => {
  const today = new Date()
  const dateString = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mb-16 hidden print:flex min-h-[600px] w-full max-w-[95vw] lg:w-[1400px] flex-shrink-0 flex-col items-center justify-center rounded-lg border border-blue-200 bg-white p-4 sm:p-6 md:p-8 font-sans print-slide">
      <H1 className="mb-8 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
        Jay's Family
      </H1>
      <P className="mb-8 text-center text-xl text-slate-600">
        Generated on {dateString}
      </P>
      {enabledTags.length > 0 && (
        <div className="w-full max-w-2xl">
          <ul className="flex flex-wrap justify-center gap-2">
            {enabledTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-slate-700"
              >
                {getTagLabel(tag, people)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default IntroSlide

