import { Person } from '../types'
import { TagDefinition } from '../customTags'
import { CUSTOM_TAGS } from '../customTags'

/**
 * Extract city name from location string
 * Examples:
 *   "Mumbai, Maharashtra" -> "Mumbai"
 *   "London, United Kingdom" -> "London"
 *   "Baltimore, Maryland" -> "Baltimore"
 */
function extractCity(location: string): string | null {
  if (!location || location.trim() === '') {
    return null
  }
  
  // Split by comma and take the first part (city)
  const parts = location.split(',').map(p => p.trim())
  return parts[0] || null
}

/**
 * Generate a tag ID from a city name
 * Examples:
 *   "Mumbai" -> "LOCATION_MUMBAI"
 *   "New York" -> "LOCATION_NEW_YORK"
 */
function generateLocationTagId(city: string): string {
  return `LOCATION_${city.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '')}`
}

/**
 * Generate a tag ID from a generation number
 * Examples:
 *   0 -> "GENERATION_0"
 *   1 -> "GENERATION_1"
 */
function generateGenerationTagId(generation: number): string {
  return `GENERATION_${generation}`
}

/**
 * Generate a tag ID from a family name
 * Examples:
 *   "Kanetkar" -> "FAMILY_KANETKAR"
 *   "Wadegaonkar" -> "FAMILY_WADEGAONKAR"
 */
function generateFamilyTagId(familyName: string): string {
  return `FAMILY_${familyName.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '')}`
}

/**
 * Generate a human-readable label for a generation tag
 */
function generateGenerationLabel(generation: number): string {
  const labels: Record<number, string> = {
    0: 'Great-Grandparents',
    1: 'Grandparents',
    2: 'Aunts and Uncles',
    3: 'Cousins',
    4: 'Nieces and Nephews',
    5: 'Next Generation',
  }
  
  return labels[generation] || `Generation ${generation}`
}

/**
 * Generate tags from people data at runtime
 */
export function generateTagsFromPeople(people: Person[]): {
  tags: TagDefinition[]
  tagLabels: Record<string, string>
} {
  // Collect unique locations (cities)
  const citySet = new Set<string>()
  const cityToFullLocation = new Map<string, string>()
  
  people.forEach((person) => {
    if (person.location) {
      const city = extractCity(person.location)
      if (city) {
        citySet.add(city)
        // Store the full location for reference
        if (!cityToFullLocation.has(city)) {
          cityToFullLocation.set(city, person.location)
        }
      }
    }
  })
  
  // Collect unique generations
  const generationSet = new Set<number>()
  people.forEach((person) => {
    if (typeof person.generation === 'number') {
      generationSet.add(person.generation)
    }
  })
  
  // Collect unique family names from people's familyName field and tags
  const familyNameSet = new Set<string>()
  
  // First, collect from people's familyName field
  people.forEach((person) => {
    if (person.familyName && typeof person.familyName === 'string') {
      familyNameSet.add(person.familyName)
    }
    
    // Also collect from FAMILY_ tags
    if (person.tags && Array.isArray(person.tags)) {
      person.tags.forEach((tag) => {
        if (tag.startsWith('FAMILY_')) {
          const familyName = tag.replace('FAMILY_', '').toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          if (familyName) {
            familyNameSet.add(familyName)
          }
        }
      })
    }
  })
  
  // Collect existing custom tags from people
  const customTagsSet = new Set<string>()
  people.forEach((person) => {
    if (person.tags && Array.isArray(person.tags)) {
      person.tags.forEach((tag) => {
        // Only collect custom tags (not location, generation, or family tags)
        if (
          !tag.startsWith('LOCATION_') &&
          !tag.startsWith('GENERATION_') &&
          !tag.startsWith('FAMILY_')
        ) {
          customTagsSet.add(tag)
        }
      })
    }
  })
  
  // Generate tag definitions
  const tags: TagDefinition[] = []
  const tagLabels: Record<string, string> = {}
  
  // Add location tags
  const sortedCities = Array.from(citySet).sort()
  sortedCities.forEach((city) => {
    const tagId = generateLocationTagId(city)
    const fullLocation = cityToFullLocation.get(city) || city
    tags.push({
      id: tagId,
      label: city,
      type: 'location',
      description: fullLocation !== city ? fullLocation : undefined,
    })
    tagLabels[tagId] = city
  })
  
  // Add generation tags
  const sortedGenerations = Array.from(generationSet).sort((a, b) => a - b)
  sortedGenerations.forEach((generation) => {
    const tagId = generateGenerationTagId(generation)
    const label = generateGenerationLabel(generation)
    tags.push({
      id: tagId,
      label,
      type: 'generation',
      description: `Generation level ${generation}`,
    })
    tagLabels[tagId] = label
  })
  
  // Add family tags
  const sortedFamilyNames = Array.from(familyNameSet).sort()
  sortedFamilyNames.forEach((familyName) => {
    const tagId = generateFamilyTagId(familyName)
    tags.push({
      id: tagId,
      label: familyName,
      type: 'family',
    })
    tagLabels[tagId] = familyName
  })
  
  // Add custom tags (preserve existing ones)
  const sortedCustomTags = Array.from(customTagsSet).sort()
  sortedCustomTags.forEach((tag) => {
    // Check if it's not already a generated tag
    if (!tags.find((t) => t.id === tag || t.label === tag)) {
      tags.push({
        id: tag,
        label: tag,
        type: 'custom',
      })
      tagLabels[tag] = tag
    }
  })
  
  // Merge with CUSTOM_TAGS
  const allTags = [...tags, ...CUSTOM_TAGS]
  const allTagLabels = {
    ...tagLabels,
    ...Object.fromEntries(CUSTOM_TAGS.map((tag) => [tag.id, tag.label])),
  }
  
  return {
    tags: allTags,
    tagLabels: allTagLabels,
  }
}

