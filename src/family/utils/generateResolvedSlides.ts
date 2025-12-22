import { Person, ResolvedFamilySlide } from '../types'
import { createPeopleMap } from './peopleMap'
import { buildBreadcrumb } from './breadcrumb'
import { deriveFamilyNameForSlide } from './familyNames'
import { calculateChildIndex } from './childIndex'

/**
 * Check if a person is in the bloodline (has parentIds or is generation 0)
 * Since we're doing DFS from generation 0, people we encounter are in the tree
 * 
 * Note: This is a heuristic - people with parentIds are assumed to be in the bloodline.
 * Spouses who married in typically won't have parentIds pointing to the main tree.
 */
function isInBloodline(person: Person): boolean {
  return person.generation === 0 || !!(person.parentIds && person.parentIds.length > 0)
}

/**
 * Depth-first traversal starting from all generation 0 people (multiple family trees)
 * Returns people in DFS order
 * 
 * Note: Handles multiple family trees by starting DFS from each generation 0 person.
 * Assumes no disconnected people (all people are reachable from generation 0 roots).
 */
function depthFirstTraversal(
  people: Person[],
  peopleMap: Map<string, Person>
): Person[] {
  const result: Person[] = []
  const visited = new Set<string>()

  function dfs(person: Person) {
    if (visited.has(person.id)) {
      return
    }
    visited.add(person.id)
    result.push(person)

    // Visit children in order
    if (person.childrenIds && person.childrenIds.length > 0) {
      for (const childId of person.childrenIds) {
        const child = peopleMap.get(childId)
        if (child) {
          dfs(child)
        }
      }
    }
  }

  // Start DFS from all generation 0 people (multiple family trees)
  const roots = people.filter((p) => p.generation === 0)
  for (const root of roots) {
    dfs(root)
  }

  return result
}

/**
 * Generate resolved slides directly from people data
 * Creates ResolvedFamilySlide[] with full Person objects (no intermediate FamilySlide type)
 * Ordered by depth-first search from generation 0
 * partner1 is always the blood relative
 * 
 * Edge Cases:
 * - Both partners generation 0: The first one encountered in DFS becomes partner1
 * - Missing references: Logs warnings and handles gracefully (returns undefined for missing spouse, filters out missing children)
 * - Spouse with parentIds in main tree: Treated as blood relative if they have parentIds, otherwise as spouse who married in
 * - Children only in partner2.childrenIds: Checks both partners' childrenIds and merges them
 * - Missing parent references: Breadcrumb stops at the missing parent, childIndex returns "Unknown"
 */
export function generateResolvedSlidesFromPeople(
  people: Person[]
): ResolvedFamilySlide[] {
  const peopleMap = createPeopleMap(people)
  const slides: ResolvedFamilySlide[] = []
  const processedPersonIds = new Set<string>()

  // Get people in depth-first order starting from generation 0
  const dfsOrderedPeople = depthFirstTraversal(people, peopleMap)

  // Create slides for each person in DFS order
  for (const person of dfsOrderedPeople) {
    // Skip if already processed (to avoid duplicates)
    if (processedPersonIds.has(person.id)) {
      continue
    }

    // Only create slides for people who have a spouse or children
    // (or are generation 0 - the root)
    const hasSpouse = !!person.spouseId
    const hasChildren = person.childrenIds && person.childrenIds.length > 0
    const isRoot = person.generation === 0

    if (!hasSpouse && !hasChildren && !isRoot) {
      continue
    }

    // Get spouse (validate reference exists)
    const spouse = person.spouseId ? peopleMap.get(person.spouseId) : undefined
    if (person.spouseId && !spouse) {
      console.warn(
        `Person ${person.id} (${person.name}) has spouseId ${person.spouseId} but spouse not found in peopleMap`
      )
    }

    // Determine which person is the blood relative (person in DFS is in tree, spouse married in)
    // If person is in bloodline, they're partner1. Otherwise, spouse is partner1.
    const personInBloodline = isInBloodline(person)
    const spouseInBloodline = spouse ? isInBloodline(spouse) : false
    
    // Handle case where spouse doesn't exist or both/neither are in bloodline
    const partner1 = (personInBloodline || !spouseInBloodline || !spouse) ? person : spouse
    const partner2 = partner1.id === person.id ? spouse : (spouse ? person : undefined)

    // Mark both as processed
    processedPersonIds.add(partner1.id)
    if (partner2) {
      processedPersonIds.add(partner2.id)
    }

    // Calculate childIndex for partner1 (blood relative)
    const childIndex = calculateChildIndex(partner1, peopleMap)

    // Get children from partner1 (validate references exist)
    const children = (partner1.childrenIds || [])
      .map((id) => {
        const child = peopleMap.get(id)
        if (!child) {
          console.warn(
            `Person ${partner1.id} (${partner1.name}) has childId ${id} but child not found in peopleMap`
          )
        }
        return child
      })
      .filter((person): person is Person => person !== undefined)
    
    // Also check partner2's childrenIds if they exist (some children might only be in partner2's list)
    if (partner2 && partner2.childrenIds && partner2.childrenIds.length > 0) {
      const partner2Children = partner2.childrenIds
        .map((id) => {
          const child = peopleMap.get(id)
          if (!child) {
            console.warn(
              `Person ${partner2.id} (${partner2.name}) has childId ${id} but child not found in peopleMap`
            )
          }
          return child
        })
        .filter((person): person is Person => person !== undefined)
      
      // Add any children from partner2 that aren't already in the list
      const existingChildIds = new Set(children.map((c) => c.id))
      for (const child of partner2Children) {
        if (!existingChildIds.has(child.id)) {
          children.push(child)
        }
      }
    }

    // Build breadcrumb from partner1 (blood relative) - optimized for first partner
    const breadcrumb = buildBreadcrumb(partner1, peopleMap)

    // Derive family name from the couple
    const familyName = deriveFamilyNameForSlide(partner1, partner2)

    // Create resolved slide with blood relative as partner1
    const resolvedSlide: ResolvedFamilySlide = {
      familyName,
      childIndex,
      couple: {
        partner1,
        ...(partner2 && { partner2 }),
      },
      children,
      breadcrumb,
    }

    slides.push(resolvedSlide)
  }

  return slides
}
