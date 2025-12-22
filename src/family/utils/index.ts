/**
 * Barrel export for all utility functions
 * Provides a single import point for utilities
 */

// Formatting utilities
export {
  formatName,
  formatNameOnly,
  formatNameWithHonorific,
  formatCoupleNames,
  getUniqueLocations,
  hasImages,
  formatChildIndex,
} from './formatting'

// Navigation utilities
export {
  createPersonUrl,
  createPersonUrlByName,
} from './navigation'

// Family name utilities
export {
  extractFamilyNameFromTag,
  getFamilyNameFromPerson,
  deriveFamilyNameForSlide,
  formatFamilyNameForSlide,
} from './familyNames'

// Tree utilities
export { buildBreadcrumb } from './breadcrumb'
export { calculateChildIndex } from './childIndex'
export { createPeopleMap } from './peopleMap'

// Slide utilities
export { findSlideByPersonId, findSlideByName, findSlideIndexByPersonId, findSlideIndexByName, findSlideIndex } from './slides'
export { generateResolvedSlidesFromPeople } from './generateResolvedSlides'

// Tag utilities
export { categorizeTags, buildTagParams, separateFilterAndCustomTags, type CategorizedTags } from './tags'
export { generateTagsFromPeople } from './generateTags'

// Hash utilities
export { createSlideId, createSlideHash, extractPersonIdFromHash } from './hash'

