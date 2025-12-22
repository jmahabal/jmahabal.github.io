/**
 * Creates a navigation URL for a person
 */
export const createPersonUrl = (personId: string, fromPersonId: string): string => {
  return `/family?person=${personId}&from=${fromPersonId}`
}

/**
 * Creates a navigation URL for a person by name (for breadcrumbs)
 */
export const createPersonUrlByName = (name: string, fromPersonId: string): string => {
  return `/family?person=${encodeURIComponent(name)}&from=${fromPersonId}`
}

