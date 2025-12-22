import {
  getLocationTagIds,
  getGenerationTagIds,
  getFamilyTagIds,
  getCustomTagIds,
} from '../hooks/useTagFiltering'
import { Person } from '../types'

export interface CategorizedTags {
  location: string | undefined
  generation: string | undefined
  family: string | undefined
  custom: string[]
}

/**
 * Categorizes tags by type (location, generation, family, custom)
 */
export function categorizeTags(tags: string[], people: Person[]): CategorizedTags {
  const locationTagIds = getLocationTagIds(people)
  const generationTagIds = getGenerationTagIds(people)
  const familyTagIds = getFamilyTagIds(people)
  const customTagIds = getCustomTagIds(people)
  
  const location = tags.find((tag) => locationTagIds.includes(tag))
  const generation = tags.find((tag) => generationTagIds.includes(tag))
  const family = tags.find((tag) => familyTagIds.includes(tag))
  const custom = tags.filter((tag) => customTagIds.includes(tag))

  return { location, generation, family, custom }
}

/**
 * Builds URL query params from categorized tags
 */
export function buildTagParams(
  tags: CategorizedTags,
  additionalParams?: Record<string, string>,
): Record<string, string> {
  const params: Record<string, string> = { ...additionalParams }

  if (tags.location) {
    params.location = tags.location
  }
  if (tags.generation) {
    params.generation = tags.generation
  }
  if (tags.family) {
    params.family = tags.family
  }
  if (tags.custom.length > 0) {
    params.tags = tags.custom.join(',')
  }

  return params
}

/**
 * Separates filter tags (location/generation/family) from custom tags
 */
export function separateFilterAndCustomTags(tags: string[], people: Person[]): {
  filterTags: string[]
  customTags: string[]
} {
  const locationTagIds = getLocationTagIds(people)
  const generationTagIds = getGenerationTagIds(people)
  const familyTagIds = getFamilyTagIds(people)
  const customTagIds = getCustomTagIds(people)
  
  const filterTags = tags.filter(
    (tag) =>
      locationTagIds.includes(tag) ||
      generationTagIds.includes(tag) ||
      familyTagIds.includes(tag),
  )
  const customTags = tags.filter((tag) => customTagIds.includes(tag))

  return { filterTags, customTags }
}

