import { Person } from '../types'

/**
 * Calculate childIndex for a person based on their position in their parent's childrenIds
 * Returns a string like "Child 1 / 5" (1-indexed) or "Great-Grandfather" for generation 0
 */
export function calculateChildIndex(
  person: Person,
  peopleMap: Map<string, Person>
): string {
  // Special case: generation 0 is "Great-Grandfather"
  if (person.generation === 0) {
    return 'Great-Grandfather'
  }

  // Find the person's position in their parent's childrenIds
  if (!person.parentIds || person.parentIds.length === 0) {
    return 'Unknown'
  }

  // Get the first parent (or the one with the lower generation)
  const parent1 = person.parentIds[0] ? peopleMap.get(person.parentIds[0]) : undefined
  const parent2 = person.parentIds[1] ? peopleMap.get(person.parentIds[1]) : undefined

  // Validate parent references
  if (person.parentIds[0] && !parent1) {
    console.warn(
      `Person ${person.id} (${person.name}) has parentId ${person.parentIds[0]} but parent not found in peopleMap`
    )
  }
  if (person.parentIds[1] && !parent2) {
    console.warn(
      `Person ${person.id} (${person.name}) has parentId ${person.parentIds[1]} but parent not found in peopleMap`
    )
  }

  let parent: Person | undefined
  if (parent1 && parent2) {
    // Choose parent with lower generation (or first if same)
    if (
      parent1.generation !== undefined &&
      parent2.generation !== undefined
    ) {
      parent = parent1.generation <= parent2.generation ? parent1 : parent2
    } else {
      parent = parent1
    }
  } else {
    parent = parent1 || parent2
  }

  if (!parent || !parent.childrenIds) {
    return 'Unknown'
  }

  // Find this person's index in the parent's childrenIds
  const childIndex = parent.childrenIds.indexOf(person.id)
  const totalSiblings = parent.childrenIds.length

  if (childIndex === -1) {
    // Person not found in parent's childrenIds (data inconsistency)
    console.warn(
      `Person ${person.id} (${person.name}) not found in parent ${parent.id}'s childrenIds array`
    )
    return 'Unknown'
  }

  // Return format: "Child 1 / 5" (1-indexed)
  return `Child ${childIndex + 1} / ${totalSiblings}`
}

