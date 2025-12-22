import { useRef, useCallback, useMemo, useEffect } from 'react'
import { ResolvedFamilySlide, Person } from '../types'
import { useUrlParams } from './index'
import { categorizeTags, buildTagParams } from '../utils/tags'
import {
  extractPersonIdFromHash,
  createSlideHash,
} from '../utils/hash'
import {
  findSlideIndexByPersonId,
  findSlideIndexByName as findSlideIndexByNameUtil,
} from '../utils/slides'

interface UseSlideNavigationOptions {
  filteredSlides: ResolvedFamilySlide[]
  resolvedSlides: ResolvedFamilySlide[]
  slideRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  people: Person[]
}

/**
 * Custom hook for managing slide navigation (scrolling, finding slides, keyboard navigation)
 */
export function useSlideNavigation({
  filteredSlides,
  resolvedSlides,
  slideRefs,
  people,
}: UseSlideNavigationOptions) {
  const { personParam, setSearchParams, selectedTags } = useUrlParams(people)
  const lastScrolledToPersonId = useRef<string | null>(null)

  // Memoized slide finder functions (use utils functions)
  const findSlideIndexByName = useCallback(
    (name: string): number | null => {
      return findSlideIndexByNameUtil(filteredSlides, name)
    },
    [filteredSlides],
  )

  const findSlideIndexById = useCallback(
    (personId: string): number | null => {
      return findSlideIndexByPersonId(filteredSlides, personId)
    },
    [filteredSlides],
  )

  // Function to scroll to a slide by index
  const scrollToSlide = useCallback(
    (index: number, updateUrl = true, fromPersonId?: string) => {
      if (index >= 0 && index < filteredSlides.length) {
        const slide = filteredSlides[index]
        const personId = slide?.couple.partner1.id
        if (!personId) return

        // Find the actual index in resolvedSlides for the ref
        const actualIndex = resolvedSlides.findIndex(
          (s) => s.couple.partner1.id === personId,
        )
        if (actualIndex < 0 || !slideRefs.current[actualIndex]) return

        // Track that we're scrolling to this person
        lastScrolledToPersonId.current = personId

        // Update hash (primary) and optionally query params (for backwards compatibility)
        if (updateUrl) {
          // Update hash for browser-native scrolling and cleaner URLs
          window.history.replaceState(null, '', createSlideHash(personId))

          // Optionally preserve query params for filters and 'from' navigation
          // But don't add 'person' param - hash is the source of truth
          if (fromPersonId || selectedTags.length > 0) {
            const additionalParams: Record<string, string> = {}
            if (fromPersonId) {
              additionalParams.from = fromPersonId
            }

            const categorizedTags = categorizeTags(selectedTags, people)
            const params = buildTagParams(categorizedTags, additionalParams)

            if (Object.keys(params).length > 0) {
              setSearchParams(params, { replace: true })
            }
          }
        }

        // Scroll to the slide
        slideRefs.current[actualIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    },
    [filteredSlides, resolvedSlides, slideRefs, selectedTags, setSearchParams],
  )

  // Get current slide index from hash (primary) or query param (fallback)
  const currentSlideIndex = useMemo(() => {
    // Check hash first (for direct linking and browser-native scrolling)
    const personIdFromHash = extractPersonIdFromHash(window.location.hash)
    if (personIdFromHash) {
      const slideIndex = findSlideIndexById(personIdFromHash)
      if (slideIndex !== null) return slideIndex
    }

    // Fallback to query param (for backwards compatibility)
    if (personParam) {
      // Try to find by person ID first
      let slideIndex = findSlideIndexById(personParam)

      // If not found, try to find by name (for breadcrumb navigation)
      if (slideIndex === null) {
        slideIndex = findSlideIndexByName(personParam)
      }

      return slideIndex
    }

    return null
  }, [personParam, findSlideIndexById, findSlideIndexByName])

  // Effect to handle hash changes and scroll to the correct slide
  useEffect(() => {
    if (currentSlideIndex === null) return

    const personId = filteredSlides[currentSlideIndex]?.couple.partner1.id
    if (!personId) return

    // Sync hash if it doesn't match (e.g., if we found slide via query param fallback)
    const expectedHash = createSlideHash(personId)
    if (window.location.hash !== expectedHash) {
      window.history.replaceState(null, '', expectedHash)
    }

    // Only scroll if we didn't just scroll to this person (prevents double-scroll)
    if (lastScrolledToPersonId.current !== personId) {
      scrollToSlide(currentSlideIndex, false) // Don't update URL since we're reading from it
    }
  }, [currentSlideIndex, filteredSlides, scrollToSlide])

  // Listen for hash changes (browser back/forward, direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const personId = extractPersonIdFromHash(window.location.hash)
      if (personId) {
        const slideIndex = findSlideIndexById(personId)
        if (slideIndex !== null) {
          scrollToSlide(slideIndex, false)
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [findSlideIndexById, scrollToSlide])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if user is typing in an input/textarea/select
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const currentIndex = currentSlideIndex ?? 0
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1
          scrollToSlide(prevIndex, true)
        } else if (filteredSlides.length > 0) {
          // Wrap to last slide if at beginning
          scrollToSlide(filteredSlides.length - 1, true)
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const currentIndex = currentSlideIndex ?? -1
        if (currentIndex < filteredSlides.length - 1) {
          const nextIndex = currentIndex + 1
          scrollToSlide(nextIndex, true)
        } else if (filteredSlides.length > 0) {
          // Wrap to first slide if at end
          scrollToSlide(0, true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlideIndex, filteredSlides.length, scrollToSlide])

  return {
    currentSlideIndex,
    scrollToSlide,
    findSlideIndexByName,
    findSlideIndexByPersonId: findSlideIndexById,
  }
}

