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
