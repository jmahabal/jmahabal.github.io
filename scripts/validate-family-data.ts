import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateResolvedSlidesFromPeople } from '../src/family/utils/generateResolvedSlides.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface Person {
  id: string
  name: string
  spouseId?: string
  childrenIds?: string[]
  parentIds?: string[]
  generation?: number
  familyName?: string
  tags?: string[]
  [key: string]: unknown
}

interface Slide {
  childIndex: string | number
  couple: {
    partner1: Person
    partner2?: Person
  }
  children: Person[]
  [key: string]: unknown
}

interface ValidationResult {
  stats: {
    totalPeople: number
    totalSlides: number
    peopleWithSpouse: number
    peopleWithChildren: number
    peopleWithParents: number
    peopleWithFamilyName: number
    peopleWithTags: number
    uniqueFamilyNames: number
    uniqueTags: number
    generations: number[]
  }
  issues: {
    missingSpouse: Array<{ person: Person; expectedSpouseId: string }>
    missingChildren: Array<{ person: Person; expectedChildrenIds: string[] }>
    missingParents: Array<{ person: Person; expectedParentIds: string[] }>
    orphanedPeople: Person[]
    duplicateIds: string[]
    invalidSpouseReferences: Array<{ person: Person; spouseId: string }>
    invalidChildReferences: Array<{ person: Person; childId: string }>
    invalidParentReferences: Array<{ person: Person; parentId: string }>
    missingFamilyNames: Person[]
    peopleNotInSlides: Person[]
    slidesWithMissingPeople: Array<{ slide: Slide; missingIds: string[] }>
    idPatternIssues: Array<{ person: Person; pattern: string }>
    childIndexMismatches: Array<{
      slide: Slide
      partner1: Person
      expectedTotal: number
      actualSiblings: number
    }>
    missingChildrenInSlides: Array<{
      person: Person
      missingChildrenIds: string[]
    }>
  }
}

function validateFamilyData(): ValidationResult {
  const peoplePath = path.join(__dirname, '../src/family/people.json')

  const people: Person[] = JSON.parse(
    fs.readFileSync(peoplePath, 'utf-8'),
  )
  
  // Generate slides from people data (same as runtime generation)
  const resolvedSlides = generateResolvedSlidesFromPeople(people)
  // Convert to format expected by validation
  const slides: Slide[] = resolvedSlides.map((slide) => ({
    childIndex: slide.childIndex,
    couple: {
      partner1: slide.couple.partner1,
      partner2: slide.couple.partner2,
    },
    children: slide.children,
  }))

  // Create maps for quick lookup
  const peopleMap = new Map<string, Person>()
  people.forEach((p) => peopleMap.set(p.id, p))

  const result: ValidationResult = {
    stats: {
      totalPeople: people.length,
      totalSlides: slides.length,
      peopleWithSpouse: 0,
      peopleWithChildren: 0,
      peopleWithParents: 0,
      peopleWithFamilyName: 0,
      peopleWithTags: 0,
      uniqueFamilyNames: 0,
      uniqueTags: 0,
      generations: [],
    },
    issues: {
      missingSpouse: [],
      missingChildren: [],
      missingParents: [],
      orphanedPeople: [],
      duplicateIds: [],
      invalidSpouseReferences: [],
      invalidChildReferences: [],
      invalidParentReferences: [],
      missingFamilyNames: [],
      peopleNotInSlides: [],
      slidesWithMissingPeople: [],
      idPatternIssues: [],
      childIndexMismatches: [],
      missingChildrenInSlides: [],
    },
  }

  // Track people referenced in slides
  const peopleInSlides = new Set<string>()

  // Check for duplicate IDs
  const idCounts = new Map<string, number>()
  people.forEach((p) => {
    idCounts.set(p.id, (idCounts.get(p.id) || 0) + 1)
  })
  idCounts.forEach((count, id) => {
    if (count > 1) {
      result.issues.duplicateIds.push(id)
    }
  })

  // Validate each person
  people.forEach((person) => {
    // Stats
    if (person.spouseId) result.stats.peopleWithSpouse++
    if (person.childrenIds && person.childrenIds.length > 0)
      result.stats.peopleWithChildren++
    if (person.parentIds && person.parentIds.length > 0)
      result.stats.peopleWithParents++
    if (person.familyName) result.stats.peopleWithFamilyName++
    if (person.tags && person.tags.length > 0) result.stats.peopleWithTags++

    // Check ID pattern - should start with "govind" (lineage from grandparent)
    if (!person.id.startsWith('govind')) {
      result.issues.idPatternIssues.push({
        person,
        pattern: person.id.split('-')[0],
      })
    }

    // Validate spouse reference
    if (person.spouseId) {
      const spouse = peopleMap.get(person.spouseId)
      if (!spouse) {
        result.issues.invalidSpouseReferences.push({
          person,
          spouseId: person.spouseId,
        })
      } else {
        // Check if spouse also references this person
        if (spouse.spouseId !== person.id) {
          result.issues.missingSpouse.push({
            person: spouse,
            expectedSpouseId: person.id,
          })
        }
      }
    }

    // Validate children references
    if (person.childrenIds) {
      person.childrenIds.forEach((childId) => {
        const child = peopleMap.get(childId)
        if (!child) {
          result.issues.invalidChildReferences.push({
            person,
            childId,
          })
        } else {
          // Check if child references this person as parent
          if (!child.parentIds || !child.parentIds.includes(person.id)) {
            result.issues.missingParents.push({
              person: child,
              expectedParentIds: child.parentIds
                ? [...child.parentIds, person.id]
                : [person.id],
            })
          }
        }
      })
    }

    // Validate parent references
    if (person.parentIds) {
      person.parentIds.forEach((parentId) => {
        const parent = peopleMap.get(parentId)
        if (!parent) {
          result.issues.invalidParentReferences.push({
            person,
            parentId,
          })
        } else {
          // Check if parent references this person as child
          if (!parent.childrenIds || !parent.childrenIds.includes(person.id)) {
            result.issues.missingChildren.push({
              person: parent,
              expectedChildrenIds: parent.childrenIds
                ? [...parent.childrenIds, person.id]
                : [person.id],
            })
          }
        }
      })
    }

    // Check for missing family name
    if (!person.familyName) {
      result.issues.missingFamilyNames.push(person)
    }

    // Check for orphaned people (no parents, no spouse, no children)
    if (
      (!person.parentIds || person.parentIds.length === 0) &&
      !person.spouseId &&
      (!person.childrenIds || person.childrenIds.length === 0) &&
      person.generation !== 0
    ) {
      result.issues.orphanedPeople.push(person)
    }
  })

  // Validate slides
  slides.forEach((slide) => {
    const missingIds: string[] = []

    // Check partner1
    if (!peopleMap.has(slide.couple.partner1.id)) {
      missingIds.push(slide.couple.partner1.id)
    } else {
      peopleInSlides.add(slide.couple.partner1.id)
    }

    // Check partner2
    if (slide.couple.partner2) {
      if (!peopleMap.has(slide.couple.partner2.id)) {
        missingIds.push(slide.couple.partner2.id)
      } else {
        peopleInSlides.add(slide.couple.partner2.id)
      }
    }

    // Check children
    slide.children.forEach((child) => {
      if (!peopleMap.has(child.id)) {
        missingIds.push(child.id)
      } else {
        peopleInSlides.add(child.id)
      }
    })

    if (missingIds.length > 0) {
      result.issues.slidesWithMissingPeople.push({
        slide,
        missingIds,
      })
    }

    // Validate childIndex matches actual number of siblings
    const partner1 = slide.couple.partner1
    if (partner1) {
      // Parse childIndex to extract total number of siblings
      // Format: "Child 1 / 5" means this person is child 1 out of 5 siblings
      // So we need to check the parent's childrenIds, not this person's childrenIds
      const childIndexStr = String(slide.childIndex)
      const match = childIndexStr.match(/\/\s*(\d+)/)
      
      if (match) {
        const expectedTotalSiblings = parseInt(match[1], 10)
        
        // Get the parent's childrenIds to see actual number of siblings
        let actualSiblings = 0
        if (partner1.parentIds && partner1.parentIds.length > 0) {
          const parent = peopleMap.get(partner1.parentIds[0])
          if (parent && parent.childrenIds) {
            actualSiblings = parent.childrenIds.length
          }
        }
        
        // Check if it matches
        if (actualSiblings !== expectedTotalSiblings) {
          result.issues.childIndexMismatches.push({
            slide,
            partner1,
            expectedTotal: expectedTotalSiblings,
            actualSiblings,
          })
        }
      }

      // Check if all children from person.childrenIds are in the slide
      if (partner1.childrenIds && partner1.childrenIds.length > 0) {
        const slideChildIds = new Set(slide.children.map((c) => c.id))
        const missingInSlide = partner1.childrenIds.filter(
          (childId) => !slideChildIds.has(childId),
        )
        if (missingInSlide.length > 0) {
          result.issues.missingChildrenInSlides.push({
            person: partner1,
            missingChildrenIds: missingInSlide,
          })
        }
      }
    }
  })

  // Find people not referenced in any slide
  people.forEach((person) => {
    if (!peopleInSlides.has(person.id)) {
      result.issues.peopleNotInSlides.push(person)
    }
  })

  // Calculate unique family names and tags
  const familyNameSet = new Set<string>()
  const tagSet = new Set<string>()
  people.forEach((person) => {
    if (person.familyName) familyNameSet.add(person.familyName)
    person.tags?.forEach((tag) => tagSet.add(tag))
  })
  result.stats.uniqueFamilyNames = familyNameSet.size
  result.stats.uniqueTags = tagSet.size

  // Calculate generations
  const generationSet = new Set<number>()
  people.forEach((person) => {
    if (typeof person.generation === 'number') {
      generationSet.add(person.generation)
    }
  })
  result.stats.generations = Array.from(generationSet).sort((a, b) => a - b)

  return result
}

function printValidationReport(result: ValidationResult) {
  console.log('📊 Family Data Validation Report\n')
  console.log('='.repeat(60))
  console.log('\n📈 STATISTICS\n')
  console.log(`Total People: ${result.stats.totalPeople}`)
  console.log(`Total Slides: ${result.stats.totalSlides}`)
  console.log(`People with Spouse: ${result.stats.peopleWithSpouse}`)
  console.log(`People with Children: ${result.stats.peopleWithChildren}`)
  console.log(`People with Parents: ${result.stats.peopleWithParents}`)
  console.log(`People with Family Name: ${result.stats.peopleWithFamilyName}`)
  console.log(`People with Tags: ${result.stats.peopleWithTags}`)
  console.log(`Unique Family Names: ${result.stats.uniqueFamilyNames}`)
  console.log(`Unique Tags: ${result.stats.uniqueTags}`)
  console.log(`Generations: ${result.stats.generations.join(', ')}`)

  console.log('\n' + '='.repeat(60))
  console.log('\n⚠️  ISSUES\n')

  let hasIssues = false

  if (result.issues.duplicateIds.length > 0) {
    hasIssues = true
    console.log(`❌ Duplicate IDs (${result.issues.duplicateIds.length}):`)
    result.issues.duplicateIds.forEach((id) => console.log(`   - ${id}`))
    console.log()
  }

  if (result.issues.idPatternIssues.length > 0) {
    hasIssues = true
    console.log(
      `⚠️  ID Pattern Issues (${result.issues.idPatternIssues.length}):`,
    )
    result.issues.idPatternIssues.forEach(({ person, pattern }) => {
      console.log(`   - ${person.id} (${person.name}) - starts with "${pattern}"`)
    })
    console.log()
  }

  if (result.issues.invalidSpouseReferences.length > 0) {
    hasIssues = true
    console.log(
      `❌ Invalid Spouse References (${result.issues.invalidSpouseReferences.length}):`,
    )
    result.issues.invalidSpouseReferences.forEach(({ person, spouseId }) => {
      console.log(`   - ${person.id} (${person.name}) → ${spouseId} (not found)`)
    })
    console.log()
  }

  if (result.issues.missingSpouse.length > 0) {
    hasIssues = true
    console.log(`⚠️  Missing Spouse References (${result.issues.missingSpouse.length}):`)
    result.issues.missingSpouse.forEach(({ person, expectedSpouseId }) => {
      console.log(
        `   - ${person.id} (${person.name}) should have spouseId: ${expectedSpouseId}`,
      )
    })
    console.log()
  }

  if (result.issues.invalidChildReferences.length > 0) {
    hasIssues = true
    console.log(
      `❌ Invalid Child References (${result.issues.invalidChildReferences.length}):`,
    )
    result.issues.invalidChildReferences.forEach(({ person, childId }) => {
      console.log(`   - ${person.id} (${person.name}) → ${childId} (not found)`)
    })
    console.log()
  }

  if (result.issues.missingChildren.length > 0) {
    hasIssues = true
    console.log(
      `⚠️  Missing Child References (${result.issues.missingChildren.length}):`,
    )
    result.issues.missingChildren.forEach(({ person, expectedChildrenIds }) => {
      console.log(
        `   - ${person.id} (${person.name}) should have childrenIds: [${expectedChildrenIds.join(', ')}]`,
      )
    })
    console.log()
  }

  if (result.issues.invalidParentReferences.length > 0) {
    hasIssues = true
    console.log(
      `❌ Invalid Parent References (${result.issues.invalidParentReferences.length}):`,
    )
    result.issues.invalidParentReferences.forEach(({ person, parentId }) => {
      console.log(`   - ${person.id} (${person.name}) → ${parentId} (not found)`)
    })
    console.log()
  }

  if (result.issues.missingParents.length > 0) {
    hasIssues = true
    console.log(
      `⚠️  Missing Parent References (${result.issues.missingParents.length}):`,
    )
    result.issues.missingParents.forEach(({ person, expectedParentIds }) => {
      console.log(
        `   - ${person.id} (${person.name}) should have parentIds: [${expectedParentIds.join(', ')}]`,
      )
    })
    console.log()
  }

  if (result.issues.missingFamilyNames.length > 0) {
    hasIssues = true
    console.log(
      `⚠️  Missing Family Names (${result.issues.missingFamilyNames.length}):`,
    )
    result.issues.missingFamilyNames.forEach((person) => {
      console.log(`   - ${person.id} (${person.name})`)
    })
    console.log()
  }

  if (result.issues.orphanedPeople.length > 0) {
    hasIssues = true
    console.log(`⚠️  Orphaned People (${result.issues.orphanedPeople.length}):`)
    result.issues.orphanedPeople.forEach((person) => {
      console.log(`   - ${person.id} (${person.name})`)
    })
    console.log()
  }

  if (result.issues.peopleNotInSlides.length > 0) {
    hasIssues = true
    console.log(
      `⚠️  People Not in Any Slide (${result.issues.peopleNotInSlides.length}):`,
    )
    result.issues.peopleNotInSlides.forEach((person) => {
      console.log(`   - ${person.id} (${person.name})`)
    })
    console.log()
  }

  if (result.issues.slidesWithMissingPeople.length > 0) {
    hasIssues = true
    console.log(
      `❌ Slides with Missing People (${result.issues.slidesWithMissingPeople.length}):`,
    )
    result.issues.slidesWithMissingPeople.forEach(({ slide, missingIds }) => {
      console.log(
        `   - Slide with partner1: ${slide.couple.partner1.name} (${slide.couple.partner1.id}), missing: [${missingIds.join(', ')}]`,
      )
    })
    console.log()
  }

  if (result.issues.childIndexMismatches.length > 0) {
    hasIssues = true
    console.log(
      `⚠️  Child Index Mismatches (${result.issues.childIndexMismatches.length}):`,
    )
    result.issues.childIndexMismatches.forEach(
      ({ slide, partner1, expectedTotal, actualSiblings }) => {
        console.log(
          `   - ${partner1.id} (${partner1.name}): childIndex says "${slide.childIndex}" (${expectedTotal} siblings), but parent has ${actualSiblings} children`,
        )
      },
    )
    console.log()
  }

  if (result.issues.missingChildrenInSlides.length > 0) {
    hasIssues = true
    console.log(
      `⚠️  Missing Children in Slides (${result.issues.missingChildrenInSlides.length}):`,
    )
    result.issues.missingChildrenInSlides.forEach(
      ({ person, missingChildrenIds }) => {
        console.log(
          `   - ${person.id} (${person.name}) has children not in slide: [${missingChildrenIds.join(', ')}]`,
        )
      },
    )
    console.log()
  }

  if (!hasIssues) {
    console.log('✅ No issues found! Data looks good.\n')
  }

  console.log('='.repeat(60))
}

// Run validation
const result = validateFamilyData()
printValidationReport(result)

// Exit with error code if there are critical issues
const criticalIssues =
  result.issues.duplicateIds.length +
  result.issues.invalidSpouseReferences.length +
  result.issues.invalidChildReferences.length +
  result.issues.invalidParentReferences.length +
  result.issues.slidesWithMissingPeople.length

if (criticalIssues > 0) {
  process.exit(1)
}

