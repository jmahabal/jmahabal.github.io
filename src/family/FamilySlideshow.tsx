import { useRef, useMemo } from 'react'
import { FamilyData, ResolvedFamilySlide } from './types'
import FamilySlideComponent from './FamilySlide'
import TagFilter from './components/TagFilter'
import IntroSlide from './components/IntroSlide'
import HonorificsPopover from './components/HonorificsModal'
import { getAllTagIds } from './tags'
import { H6 } from '../components/ui/Typography'
import { Button } from '../components/ui/button'
import { HelpCircle } from 'lucide-react'
import {
  useUrlParams,
  useTagFiltering,
  useSlideNavigation,
} from './hooks'
import { getLocationTagIds } from './hooks/useTagFiltering'
import { createSlideId } from './utils/hash'
import { generateResolvedSlidesFromPeople } from './utils/generateResolvedSlides'

interface FamilySlideshowProps {
  data: FamilyData
}

const FamilySlideshow = ({ data }: FamilySlideshowProps) => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  // Generate resolved slides directly from people data
  const resolvedSlides: ResolvedFamilySlide[] = useMemo(() => {
    return generateResolvedSlidesFromPeople(data.people)
  }, [data.people])

  // Map of person IDs that have slides (where they appear as partner1 or partner2)
  const personIdsWithSlides = new Set<string>()
  resolvedSlides.forEach((slide) => {
    personIdsWithSlides.add(slide.couple.partner1.id)
    if (slide.couple.partner2) {
      personIdsWithSlides.add(slide.couple.partner2.id)
    }
  })

  // Extract all unique tags from people
  const allTags = useMemo(() => {
    const tagSet = new Set<string>(getAllTagIds(data.people))
    data.people.forEach((person) => {
      person.tags?.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [data.people])

  // Calculate tag counts (how many people have each tag)
  const tagCounts = useMemo(() => {
    const locationTagIds = getLocationTagIds(data.people)
    const counts = new Map<string, number>()
    data.people.forEach((person) => {
      person.tags?.forEach((tag) => {
        // For location tags, only count non-deceased people
        if (locationTagIds.includes(tag)) {
          if (!person.deceased) {
            counts.set(tag, (counts.get(tag) || 0) + 1)
          }
        } else {
          // For other tags, count all people
          counts.set(tag, (counts.get(tag) || 0) + 1)
        }
      })
    })
    return counts
  }, [data.people])

  // URL params and tag filtering
  const { selectedTags, updateTagParams, clearAllParams } = useUrlParams(data.people)
  const { filteredSlides } = useTagFiltering({
    resolvedSlides,
    selectedTags,
    people: data.people,
  })

  // Calculate unique people count from filtered slides
  const filteredPeopleCount = new Set<string>()
  filteredSlides.forEach((slide) => {
    filteredPeopleCount.add(slide.couple.partner1.id)
    if (slide.couple.partner2) {
      filteredPeopleCount.add(slide.couple.partner2.id)
    }
    slide.children.forEach((child) => {
      filteredPeopleCount.add(child.id)
    })
  })

  // Handle reset - clear tags, all query params, and hash
  const handleReset = () => {
    clearAllParams()
    // Also clear hash if present
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  // Slide navigation (scrolling, keyboard navigation, URL sync)
  useSlideNavigation({
    filteredSlides,
    resolvedSlides,
    slideRefs,
    people: data.people,
  })

  return (
    <div className="relative flex h-screen w-full flex-col">
      {/* Top bar with Tag Filter and Back button */}
      <div className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white shadow-sm">
        <div className="mx-auto px-8 py-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            {/* Left: Honorifics button */}
            <div className="relative flex justify-start flex-wrap">
              <HonorificsPopover>
                <Button
                  variant="outline"
                  size="sm"
                  className="print:hidden"
                  aria-label="Honorifics help"
                  title="Honorifics guide"
                >
                  Honorifics{' '}
                  <HelpCircle className="h-4 w-4" strokeWidth={1.5} />
                </Button>
              </HonorificsPopover>
            </div>

            {/* Middle: Title + slide count */}
            <div className="flex flex-col items-center justify-center gap-1">
              <h1 className="text-2xl text-slate-900">Jay's Family</h1>
              <span className="text-sm text-slate-600">
                {filteredSlides.length} slide
                {filteredSlides.length !== 1 ? 's' : ''} •{' '}
                {filteredPeopleCount.size} people
              </span>
            </div>

            {/* Right: Filters */}
            <div className="flex justify-end flex-wrap">
              <TagFilter
                tags={allTags}
                selectedTags={selectedTags}
                onTagChange={updateTagParams}
                onReset={handleReset}
                tagCounts={tagCounts}
                people={data.people}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-1 flex-col items-center overflow-y-auto overflow-x-hidden p-12"
        style={{
          background:
            'linear-gradient(45deg, rgb(0, 160, 249), rgb(4, 6, 154))',
        }}
      >
        {/* Intro Slide */}
        <IntroSlide enabledTags={selectedTags} people={data.people} />

        {filteredSlides.length === 0 ? (
          <div className="mb-16 flex min-h-[600px] w-full max-w-[95vw] lg:w-[1400px] flex-shrink-0 flex-col items-center justify-center rounded-lg border border-blue-200 bg-white p-4 sm:p-6 md:p-8 font-sans">
            <H6 className="text-center text-xl font-medium text-slate-700">
              No slides match the selected tag filter.
            </H6>
          </div>
        ) : (
          filteredSlides.map((slide) => {
            // Find the actual index in resolvedSlides for the ref
            const actualIndex = resolvedSlides.findIndex(
              (s) => s.couple.partner1.id === slide.couple.partner1.id,
            )
            const slideId = createSlideId(slide.couple.partner1.id)
            return (
              <div
                key={slide.couple.partner1.id}
                id={slideId}
                className="print-slide transition-opacity duration-300"
                ref={(el) => {
                  if (actualIndex >= 0) {
                    slideRefs.current[actualIndex] = el
                  }
                }}
              >
                <FamilySlideComponent
                  slide={slide}
                  personIdsWithSlides={personIdsWithSlides}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default FamilySlideshow
