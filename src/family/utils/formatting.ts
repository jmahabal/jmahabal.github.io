import { Person } from '../types'

/**
 * Formats a person's name with honorific and deceased indicator
 */
export const formatName = (
  person: { name?: string; honorific?: string; deceased?: boolean } | null | undefined
): string => {
  if (!person?.name) return 'Unknown'
  const fullName = person.honorific ? `${person.name} ${person.honorific}` : person.name
  return person.deceased ? `${fullName}*` : fullName
}

/**
 * Formats a person's name without honorific (just the base name)
 */
export const formatNameOnly = (
  person: { name?: string; deceased?: boolean } | null | undefined
): string => {
  if (!person?.name) return 'Unknown'
  return person.deceased ? `${person.name}*` : person.name
}

/**
 * Formats a person's name with honorific but without deceased indicator
 */
export const formatNameWithHonorific = (
  person: { name?: string; honorific?: string } | null | undefined
): string => {
  if (!person?.name) return 'Unknown'
  return person.honorific ? `${person.name} ${person.honorific}` : person.name
}

/**
 * Formats the couple's names for display
 */
export const formatCoupleNames = (
  partner1: Person,
  partner2?: Person
): string => {
  if (!partner2) {
    return formatName(partner1)
  }
  return `${formatName(partner1)} + ${formatName(partner2)}`
}

/**
 * Gets unique locations from a couple
 */
export const getUniqueLocations = (
  partner1: Person,
  partner2?: Person
): string[] => {
  return Array.from(
    new Set(
      [partner1, partner2]
        .filter((person): person is Person => person !== null && person !== undefined)
        .map((person) => person?.location)
        .filter((location): location is string => location !== undefined && location !== '')
    )
  )
}

/**
 * Checks if a couple has images
 */
export const hasImages = (partner1: Person, partner2?: Person): boolean => {
  if (!partner2) {
    return partner1.image?.url !== undefined
  }
  return partner1.image?.url !== undefined && partner2.image?.url !== undefined
}

/**
 * Formats the child index display
 */
export const formatChildIndex = (
  childIndex: number | string,
  totalSiblings?: number
): string => {
  if (typeof childIndex === 'string') {
    return childIndex
  }
  return totalSiblings
    ? `Child ${childIndex} of ${totalSiblings}`
    : `Child ${childIndex}`
}

