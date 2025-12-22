import { Person } from '../types'

/**
 * Builds a breadcrumb path for a person by tracing back through generations
 * Uses person.parentIds to navigate up the family tree
 */
export function buildBreadcrumb(
  person: Person,
  peopleMap: Map<string, Person>,
): string[] {
  const path: string[] = []
  let currentPerson: Person | undefined = person

  // Trace back through generations until we reach generation 0 or can't find a parent
  while (currentPerson) {
    // Add current person to path
    path.unshift(currentPerson.name)

    // If we've reached generation 0, we're done
    if (currentPerson.generation === 0) {
      break
    }

    // Get parents from person.parentIds
    if (!currentPerson.parentIds || currentPerson.parentIds.length === 0) {
      break
    }

    // Get both parents (validate references exist)
    const parent1: Person | undefined = currentPerson.parentIds[0]
      ? peopleMap.get(currentPerson.parentIds[0])
      : undefined
    const parent2: Person | undefined = currentPerson.parentIds[1]
      ? peopleMap.get(currentPerson.parentIds[1])
      : undefined
    
    // Warn about missing parent references
    if (currentPerson.parentIds[0] && !parent1) {
      console.warn(
        `Person ${currentPerson.id} (${currentPerson.name}) has parentId ${currentPerson.parentIds[0]} but parent not found in peopleMap`
      )
    }
    if (currentPerson.parentIds[1] && !parent2) {
      console.warn(
        `Person ${currentPerson.id} (${currentPerson.name}) has parentId ${currentPerson.parentIds[1]} but parent not found in peopleMap`
      )
    }

    // Choose the parent in the main lineage (typically the first parent is the Kanetkar)
    // If both are same generation, prefer parent1 (the main lineage)
    // If one has lower generation, use that one (the main lineage)
    let parent: Person | undefined
    if (parent1 && parent2) {
      if (
        parent1.generation !== undefined &&
        parent2.generation !== undefined
      ) {
        parent = parent1.generation <= parent2.generation ? parent1 : parent2
      } else {
        parent = parent1 // Default to parent1
      }
    } else {
      parent = parent1 || parent2
    }

    if (!parent) break

    // Continue tracing with the parent
    currentPerson = parent
  }

  return path
}

