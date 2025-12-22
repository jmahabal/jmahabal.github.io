import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface Person {
  id: string
  name: string
  location?: string
  generation?: number
  tags?: string[]
  [key: string]: unknown
}

/**
 * NOTE: Tags are now generated at runtime from people.json
 * This script is kept for adding/updating tags in people.json entries
 * (location, generation, and family tags are automatically added to people)
 */

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
 * Main function to add tags to people.json
 * Tags are now generated at runtime, but this script ensures people.json
 * has the correct location, generation, and family tags
 */
function main() {
  const peopleJsonPath = path.join(__dirname, '../src/family/people.json')
  
  console.log('📊 Reading people.json...')
  const peopleData: Person[] = JSON.parse(
    fs.readFileSync(peopleJsonPath, 'utf-8')
  )
  console.log(`📋 Found ${peopleData.length} people in dataset\n`)
  
  // Collect unique locations (cities)
  const citySet = new Set<string>()
  const cityToFullLocation = new Map<string, string>()
  
  peopleData.forEach((person) => {
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
  peopleData.forEach((person) => {
    if (typeof person.generation === 'number') {
      generationSet.add(person.generation)
    }
  })
  
  // Collect unique family names from people's familyName field and tags
  const familyNameSet = new Set<string>()
  const personToFamilies = new Map<string, Set<string>>() // Map person ID to set of family names
  
  // First, collect from people's familyName field
  peopleData.forEach((person) => {
    if (person.familyName && typeof person.familyName === 'string') {
      familyNameSet.add(person.familyName)
      if (!personToFamilies.has(person.id)) {
        personToFamilies.set(person.id, new Set())
      }
      personToFamilies.get(person.id)!.add(person.familyName)
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
            if (!personToFamilies.has(person.id)) {
              personToFamilies.set(person.id, new Set())
            }
            personToFamilies.get(person.id)!.add(familyName)
          }
        }
      })
    }
  })
  
  // Collect existing custom tags from people
  const customTagsSet = new Set<string>()
  peopleData.forEach((person) => {
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
  
  // Sort collections for consistent output
  const sortedCities = Array.from(citySet).sort()
  const sortedGenerations = Array.from(generationSet).sort((a, b) => a - b)
  const sortedFamilyNames = Array.from(familyNameSet).sort()
  const sortedCustomTags = Array.from(customTagsSet).sort()
  
  console.log('📍 Found', citySet.size, 'unique cities')
  console.log('👥 Found', generationSet.size, 'unique generations')
  console.log('👨‍👩‍👧‍👦 Found', familyNameSet.size, 'unique family names')
  console.log('🏷️  Found', customTagsSet.size, 'custom tags')
  console.log('\n📊 Tag Summary:')
  console.log('   -', sortedCities.length, 'location tags')
  console.log('   -', sortedGenerations.length, 'generation tags')
  console.log('   -', sortedFamilyNames.length, 'family tags')
  console.log('   -', sortedCustomTags.length, 'custom tags')
  console.log('\n💡 Note: Tags are now generated at runtime from people.json')
  console.log('   This script ensures people.json has the correct tags.\n')
  
  // Now add location, generation, and family tags to each person
  console.log('🏷️  Adding tags to people...')
  let updatedCount = 0
  
  const updatedPeople = peopleData.map((person) => {
    const personTags = new Set<string>(person.tags || [])
    let wasUpdated = false
    
    // Add location tag if location exists
    if (person.location) {
      const city = extractCity(person.location)
      if (city) {
        const locationTagId = generateLocationTagId(city)
        if (!personTags.has(locationTagId)) {
          personTags.add(locationTagId)
          wasUpdated = true
        }
      }
    }
    
    // Add generation tag if generation exists
    if (typeof person.generation === 'number') {
      const generationTagId = generateGenerationTagId(person.generation)
      if (!personTags.has(generationTagId)) {
        personTags.add(generationTagId)
        wasUpdated = true
      }
    }
    
    // Add family tags if person appears in slides with family names
    const personFamilies = personToFamilies.get(person.id)
    if (personFamilies) {
      personFamilies.forEach((familyName) => {
        const familyTagId = generateFamilyTagId(familyName)
        if (!personTags.has(familyTagId)) {
          personTags.add(familyTagId)
          wasUpdated = true
        }
      })
    }
    
    if (wasUpdated) {
      updatedCount++
    }
    
    // Return updated person with sorted tags array
    return {
      ...person,
      tags: Array.from(personTags).sort(),
    }
  })
  
  // Write updated people.json
  fs.writeFileSync(
    peopleJsonPath,
    JSON.stringify(updatedPeople, null, 2) + '\n'
  )
  
  console.log('✅ Updated', updatedCount, 'people with location and generation tags')
  console.log('📄 People written to:', peopleJsonPath)
  
  // Print summary
  console.log('\n📋 Tag Summary:\n')
  console.log('📍 Location Tags:')
  sortedCities.forEach((city) => {
    const tagId = generateLocationTagId(city)
    const count = updatedPeople.filter((p) =>
      p.tags?.includes(tagId)
    ).length
    console.log(`   - ${tagId}: ${city} (${count} people)`)
  })
  
  console.log('\n👥 Generation Tags:')
  sortedGenerations.forEach((generation) => {
    const tagId = generateGenerationTagId(generation)
    const label = generateGenerationLabel(generation)
    const count = updatedPeople.filter((p) =>
      p.tags?.includes(tagId)
    ).length
    console.log(`   - ${tagId}: ${label} (${count} people)`)
  })
  
  console.log('\n👨‍👩‍👧‍👦 Family Tags:')
  sortedFamilyNames.forEach((familyName) => {
    const tagId = generateFamilyTagId(familyName)
    const count = updatedPeople.filter((p) =>
      p.tags?.includes(tagId)
    ).length
    console.log(`   - ${tagId}: ${familyName} (${count} people)`)
  })
  
  if (sortedCustomTags.length > 0) {
    console.log('\n🏷️  Custom Tags:')
    sortedCustomTags.forEach((tag) => {
      const count = updatedPeople.filter((p) =>
        p.tags?.includes(tag)
      ).length
      console.log(`   - ${tag} (${count} people)`)
    })
  }
}

// Run the main function
main()
