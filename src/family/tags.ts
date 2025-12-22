import { TagDefinition } from './customTags'
import { Person } from './types'
import { generateTagsFromPeople } from './utils/generateTags'

// Re-export TagDefinition for external use
export type { TagDefinition }

/**
 * Type representing all valid tag names
 */
export type TagName = string

/**
 * Get all tags from people data (pure function)
 */
export function getAllTags(people: Person[]): TagDefinition[] {
  const { tags } = generateTagsFromPeople(people)
  return tags
}

/**
 * Get all tag labels from people data (pure function)
 */
export function getTagLabels(people: Person[]): Record<string, string> {
  const { tagLabels } = generateTagsFromPeople(people)
  return tagLabels
}

/**
 * Array of all tag names from people data
 */
export function getAllTagIds(people: Person[]): TagName[] {
  return getAllTags(people).map((tag) => tag.id)
}

/**
 * Get the display label for a tag
 * Falls back to the tag ID if no label is found
 */
export function getTagLabel(tag: string, people: Person[]): string {
  const labels = getTagLabels(people)
  return labels[tag] || tag
}

/**
 * Get tag metadata by ID
 */
export function getTag(tagId: string, people: Person[]): TagDefinition | undefined {
  return getAllTags(people).find((tag) => tag.id === tagId)
}

/**
 * Get all tags of a specific type
 */
export function getTagsByType(
  type: 'location' | 'generation' | 'custom' | 'family',
  people: Person[],
): TagDefinition[] {
  return getAllTags(people).filter((tag) => tag.type === type)
}

