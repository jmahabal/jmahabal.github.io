import { ResolvedFamilySlide } from '../types'

/**
 * Finds slide by person ID
 * Checks both partner1 and partner2
 */
export function findSlideByPersonId(
  slides: ResolvedFamilySlide[],
  personId: string,
): { slide: ResolvedFamilySlide; index: number } | null {
  const index = slides.findIndex(
    (slide) =>
      slide.couple.partner1.id === personId ||
      slide.couple.partner2?.id === personId,
  )
  return index >= 0 ? { slide: slides[index], index } : null
}

/**
 * Finds slide by person name
 * Checks both partner1 and partner2
 */
export function findSlideByName(
  slides: ResolvedFamilySlide[],
  name: string,
): { slide: ResolvedFamilySlide; index: number } | null {
  const index = slides.findIndex(
    (slide) =>
      slide.couple.partner1.name === name ||
      slide.couple.partner2?.name === name,
  )
  return index >= 0 ? { slide: slides[index], index } : null
}

/**
 * Finds slide index by person ID
 * Checks both partner1 and partner2
 */
export function findSlideIndexByPersonId(
  slides: ResolvedFamilySlide[],
  personId: string,
): number | null {
  return findSlideByPersonId(slides, personId)?.index ?? null
}

/**
 * Finds slide index by person name
 * Checks both partner1 and partner2
 */
export function findSlideIndexByName(
  slides: ResolvedFamilySlide[],
  name: string,
): number | null {
  return findSlideByName(slides, name)?.index ?? null
}

/**
 * Finds slide index by person ID or name (tries ID first, then name)
 */
export function findSlideIndex(
  slides: ResolvedFamilySlide[],
  identifier: string,
): number | null {
  // Try by ID first
  const byId = findSlideIndexByPersonId(slides, identifier)
  if (byId !== null) return byId

  // Fallback to name
  return findSlideIndexByName(slides, identifier)
}

