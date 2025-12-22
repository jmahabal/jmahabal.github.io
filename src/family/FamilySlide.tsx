import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ResolvedFamilySlide } from './types'
import { H1, H6, P } from '../components/ui/Typography'
import {
  formatCoupleNames,
  getUniqueLocations,
  hasImages,
  formatChildIndex,
  formatFamilyNameForSlide,
  formatName,
} from './utils'
import ChildrenList from './components/ChildrenList'
import FamilyBreadcrumb from './components/FamilyBreadcrumb'

interface FamilySlideProps {
  slide: ResolvedFamilySlide
  personIdsWithSlides: Set<string>
}

const FamilySlide: React.FC<FamilySlideProps> = ({ 
  slide, 
  personIdsWithSlides,
}) => {
  const navigate = useNavigate()

  // Defensive checks
  if (!slide.couple?.partner1) {
    return (
      <div className="mb-16 flex min-h-[600px] w-full max-w-[95vw] lg:w-[1400px] flex-shrink-0 flex-col rounded-lg border border-blue-200 bg-white p-4 sm:p-6 md:p-8 font-sans">
        <P className="text-center text-slate-800">Error: Missing person data</P>
      </div>
    )
  }

  const { partner1, partner2 } = slide.couple
  const uniqueLocations = getUniqueLocations(partner1, partner2)
  const slideHasImages = hasImages(partner1, partner2)
  const childIndexDisplay = formatChildIndex(
    slide.childIndex,
    partner1.totalSiblings
  )
  const coupleNames = formatCoupleNames(partner1, partner2)
  const displayFamilyName = formatFamilyNameForSlide(partner1, partner2)

  const handleNavigate = (url: string) => {
    navigate(url)
  }

  return (
    <div className="mb-16 flex min-h-[600px] w-full max-w-[95vw] lg:w-[1400px] flex-shrink-0 flex-col rounded-lg border border-blue-200 bg-white p-4 sm:p-6 md:p-8 font-sans">
      <div className="flex justify-between">
        <H6 className="text-xl font-medium uppercase tracking-wider text-slate-700">
          {displayFamilyName}
        </H6>
        <div className="flex items-center gap-4">
          {slide.breadcrumb && (
            <FamilyBreadcrumb
              breadcrumb={slide.breadcrumb}
              childIndexDisplay={childIndexDisplay}
              currentPersonId={partner1.id}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </div>

      <div className="my-4 sm:my-6 h-px bg-blue-200" />

      {slideHasImages ? (
        <>
          <div className="flex flex-grow flex-col items-center justify-center gap-6">
            <H1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">{coupleNames}</H1>
            <ChildrenList
              children={slide.children}
              currentPersonId={partner1.id}
              onNavigate={handleNavigate}
              personIdsWithSlides={personIdsWithSlides}
            />
          </div>
          <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 pb-8 sm:pb-12">
            {[partner1, partner2]
              .filter((person) => person !== null && person !== undefined)
              .map((person) => (
                <div
                  key={person.id}
                  className="flex h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 items-center justify-center overflow-hidden rounded-full border border-blue-200 bg-white"
                >
                  {person.image?.url && (
                    <img
                      src={person.image.url}
                      alt={formatName(person)}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="flex flex-grow flex-col items-center justify-center gap-6">
          <H1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">{coupleNames}</H1>
          <ChildrenList
            children={slide.children}
            currentPersonId={partner1.id}
            onNavigate={handleNavigate}
            personIdsWithSlides={personIdsWithSlides}
          />
        </div>
      )}

      {uniqueLocations.length > 0 && (
        <div className="flex justify-center pt-4 pb-4">
          <P className="text-center text-base sm:text-lg md:text-xl font-medium text-slate-700">
            {uniqueLocations.join(' | ')}
          </P>
        </div>
      )}
    </div>
  )
}

export default FamilySlide
