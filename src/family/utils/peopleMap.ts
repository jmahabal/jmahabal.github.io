import { Person } from '../types'

/**
 * Creates a Map of person ID to Person for quick lookups
 */
export function createPeopleMap(people: Person[]): Map<string, Person> {
  const map = new Map<string, Person>()
  people.forEach((person) => {
    map.set(person.id, person)
  })
  return map
}

