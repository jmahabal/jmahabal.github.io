import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categorizeTags, buildTagParams } from '../utils/tags'
import { Person } from '../types'

/**
 * Custom hook for managing URL parameters related to family slideshow
 */
export function useUrlParams(people: Person[]) {
  const [searchParams, setSearchParams] = useSearchParams()

  // Get selected tags from URL params
  // Supports both individual params (location, generation, family) and comma-separated tags param
  const selectedTags = useMemo(() => {
    const tags: string[] = []

    // Read individual filter params
    const locationParam = searchParams.get('location')
    const generationParam = searchParams.get('generation')
    const familyParam = searchParams.get('family')

    if (locationParam) tags.push(locationParam)
    if (generationParam) tags.push(generationParam)
    if (familyParam) tags.push(familyParam)

    // Also read comma-separated tags param (for custom tags and backwards compatibility)
    const tagParam = searchParams.get('tags')
    if (tagParam) {
      const tagList = tagParam.split(',').filter((tag) => tag.trim() !== '')
      tagList.forEach((tag) => {
        if (!tags.includes(tag)) tags.push(tag)
      })
    }

    return tags
  }, [searchParams])

  const personParam = searchParams.get('person')
  const fromParam = searchParams.get('from')

  /**
   * Update URL params with selected tags
   */
  const updateTagParams = (tags: string[]) => {
    const additionalParams: Record<string, string> = {}

    // Preserve person and from params (for backwards compatibility)
    if (personParam) {
      additionalParams.person = personParam
    }
    if (fromParam) {
      additionalParams.from = fromParam
    }

    const categorizedTags = categorizeTags(tags, people)
    const params = buildTagParams(categorizedTags, additionalParams)

    setSearchParams(params)
  }

  /**
   * Clear all query parameters (including person and from)
   */
  const clearAllParams = () => {
    setSearchParams({}, { replace: true })
  }

  return {
    selectedTags,
    personParam,
    fromParam,
    updateTagParams,
    clearAllParams,
    setSearchParams,
  }
}

