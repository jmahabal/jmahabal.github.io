/**
 * Converts a string to kebab-case format
 * @param word - The string to convert
 * @returns The kebab-case formatted string
 */
export const toKebabCase = (word: string): string => {
  return word.toLowerCase().split(' ').join('-')
}

/**
 * Generates a gradient color for the background
 * @returns A CSS gradient string
 */
export const generateGradient = (): string => {
  return 'linear-gradient(45deg, rgb(0, 160, 249), rgb(4, 6, 154))'
}

/**
 * Generates a URL-friendly ID from text
 * @param text - The text to convert to an ID
 * @returns A URL-friendly ID string
 */
export function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
