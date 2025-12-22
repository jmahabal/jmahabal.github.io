/**
 * Hash prefix for slide navigation
 */
export const SLIDE_HASH_PREFIX = '#slide-'

/**
 * Slide ID prefix (without hash)
 */
export const SLIDE_ID_PREFIX = 'slide-'

/**
 * Extracts person ID from slide hash
 * @param hash - Hash string (e.g., "#slide-abc123")
 * @returns Person ID or null if hash doesn't match format
 */
export function extractPersonIdFromHash(hash: string): string | null {
  if (hash && hash.startsWith(SLIDE_HASH_PREFIX)) {
    return hash.replace(SLIDE_HASH_PREFIX, '')
  }
  return null
}

/**
 * Creates a slide hash from person ID
 * @param personId - Person ID
 * @returns Hash string (e.g., "#slide-abc123")
 */
export function createSlideHash(personId: string): string {
  return `${SLIDE_HASH_PREFIX}${personId}`
}

/**
 * Creates a slide ID from person ID (for HTML element id attribute)
 * @param personId - Person ID
 * @returns Slide ID (e.g., "slide-abc123")
 */
export function createSlideId(personId: string): string {
  return `${SLIDE_ID_PREFIX}${personId}`
}

