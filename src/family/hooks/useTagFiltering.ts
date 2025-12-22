import { useMemo } from 'react'
import { ResolvedFamilySlide, Person } from '../types'
import { getTagsByType } from '../tags'
import { separateFilterAndCustomTags } from '../utils/tags'

// Helper functions to get tag type arrays (pure functions)
export function getLocationTagIds(people: Person[]): string[] {
  return getTagsByType('location', people).map((tag) => tag.id)
}

export function getGenerationTagIds(people: Person[]): string[] {
  return getTagsByType('generation', people).map((tag) => tag.id)
}

export function getFamilyTagIds(people: Person[]): string[] {
  return getTagsByType('family', people).map((tag) => tag.id)
}

export function getCustomTagIds(people: Person[]): string[] {
  return Array.from(new Set(getTagsByType('custom', people).map((tag) => tag.id)))
}

interface UseTagFilteringOptions {
  resolvedSlides: ResolvedFamilySlide[]
  selectedTags: string[]
  people: Person[]
}

/**
 * Custom hook for filtering slides based on selected tags
 */
export function useTagFiltering({
  resolvedSlides,
  selectedTags,
  people,
}: UseTagFilteringOptions) {
  const filteredSlides = useMemo(() => {
    if (selectedTags.length === 0) return resolvedSlides

    // Separate filters (location/generation/family) from custom tags
    const { filterTags, customTags: selectedCustomTags } =
      separateFilterAndCustomTags(selectedTags, people)

    return resolvedSlides.filter((slide) => {
      // Helper to check if a person has a tag
      const personHasTag = (person: Person, tag: string) =>
        person.tags?.includes(tag) || false

      // Helper to check if slide matches a tag (checks both partners)
      // For location tags, only match if the person is not deceased
      const slideHasTag = (tag: string) => {
        const locationTagIds = getLocationTagIds(people)
        const isLocationTag = locationTagIds.includes(tag)
        
        // Check partner1
        if (personHasTag(slide.couple.partner1, tag)) {
          // For location tags, only match if person is not deceased
          if (isLocationTag && slide.couple.partner1.deceased) {
            // Skip this person for location tags
          } else {
            return true
          }
        }
        
        // Check partner2
        if (slide.couple.partner2 && personHasTag(slide.couple.partner2, tag)) {
          // For location tags, only match if person is not deceased
          if (isLocationTag && slide.couple.partner2.deceased) {
            // Skip this person for location tags
          } else {
            return true
          }
        }
        
        return false
      }

      // Filters (location/generation) are AND - must match ALL
      const matchesFilters =
        filterTags.length === 0 || filterTags.every((tag) => slideHasTag(tag))

      // Custom tags are OR - must match ANY (if any are selected)
      const matchesCustomTags =
        selectedCustomTags.length === 0 ||
        selectedCustomTags.some((tag) => slideHasTag(tag))

      // Both filter conditions AND custom tag conditions must be met
      return matchesFilters && matchesCustomTags
    })
  }, [resolvedSlides, selectedTags, people])

  return { filteredSlides }
}

