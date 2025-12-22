import { Person } from '../types'

/**
 * Extracts family name from a FAMILY_ tag
 * Examples: "FAMILY_KANETKAR" -> "Kanetkar", "FAMILY_WADEGAONKAR" -> "Wadegaonkar"
 */
export const extractFamilyNameFromTag = (tag: string): string | null => {
  if (!tag.startsWith('FAMILY_')) {
    return null
  }
  // Remove "FAMILY_" prefix and convert to title case
  const name = tag.replace('FAMILY_', '').toLowerCase()
  // Convert to title case (first letter uppercase, rest lowercase)
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/**
 * Gets the primary family name from a person's tags
 * Prefers non-Kanetkar family if multiple exist, otherwise uses Kanetkar
 */
export const getFamilyNameFromPerson = (person: Person): string | null => {
  if (!person.tags || person.tags.length === 0) {
    return null
  }
  
  const familyTags = person.tags.filter(tag => tag.startsWith('FAMILY_'))
  if (familyTags.length === 0) {
    return null
  }
  
  // Extract family names
  const familyNames = familyTags
    .map(tag => extractFamilyNameFromTag(tag))
    .filter((name): name is string => name !== null)
  
  if (familyNames.length === 0) {
    return null
  }
  
  // Prefer non-Kanetkar family if multiple exist
  const nonKanetkar = familyNames.find(name => name !== 'Kanetkar')
  return nonKanetkar || familyNames[0]
}

/**
 * Derives the family name for a slide from the couple
 * Logic: Follow the male in the relationship (traditional family name inheritance)
 * 1. If partner1 is male, use partner1's family name
 * 2. If partner1 is not male but partner2 is male, use partner2's family name
 * 3. Otherwise, default to partner1's family name
 * Falls back to tag extraction if familyName is not set on the person
 */
export const deriveFamilyNameForSlide = (
  partner1: Person,
  partner2?: Person
): string => {
  // Follow the male in the relationship
  if (partner1.gender === 'male') {
    const familyName = partner1.familyName || getFamilyNameFromPerson(partner1)
    if (familyName) {
      return familyName
    }
  }
  
  // If partner1 is not male, check partner2
  if (partner2 && partner2.gender === 'male') {
    const familyName = partner2.familyName || getFamilyNameFromPerson(partner2)
    if (familyName) {
      return familyName
    }
  }
  
  // Default to partner1's family name
  return partner1.familyName || getFamilyNameFromPerson(partner1) || 'Unknown Family'
}

/**
 * Formats family name(s) for display on a slide
 * If both partners have different family names, displays both (e.g., "Kanetkar + Vaidya")
 * Otherwise, displays the single family name
 * Falls back to tag extraction if familyName is not set on the person
 */
export const formatFamilyNameForSlide = (
  partner1: Person,
  partner2?: Person
): string => {
  const partner1FamilyName = partner1.familyName || getFamilyNameFromPerson(partner1)
  const partner2FamilyName = partner2 
    ? (partner2.familyName || getFamilyNameFromPerson(partner2))
    : null
  
  // If both have family names and they're different, show both
  if (partner1FamilyName && partner2FamilyName && partner1FamilyName !== partner2FamilyName) {
    return `${partner1FamilyName} + ${partner2FamilyName}`
  }
  
  // Otherwise, show the single family name (or the one that exists)
  return partner1FamilyName || partner2FamilyName || 'Unknown Family'
}

