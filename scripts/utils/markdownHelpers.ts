/**
 * Regex pattern for matching markdown image syntax: ![alt](path)
 */
const IMAGE_MARKDOWN_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g

/**
 * Extract all image paths from markdown content
 * @param markdown - Markdown content string
 * @returns Array of unique image paths that start with / (public paths)
 */
export function extractImagePaths(markdown: string): string[] {
  const paths: string[] = []
  let match

  // Reset regex lastIndex to ensure we start from the beginning
  IMAGE_MARKDOWN_REGEX.lastIndex = 0

  while ((match = IMAGE_MARKDOWN_REGEX.exec(markdown)) !== null) {
    const imagePath = match[2]
    // Only process paths that start with / (public paths)
    if (imagePath.startsWith('/')) {
      paths.push(imagePath)
    }
  }

  return [...new Set(paths)] // Remove duplicates
}

/**
 * Update markdown content to use optimized image paths
 * @param markdown - Original markdown content
 * @param imageMap - Map from original path to optimized path
 * @returns Markdown with updated image paths
 */
export function updateImagePaths(
  markdown: string,
  imageMap: Map<string, string>,
): string {
  // Reset regex lastIndex
  IMAGE_MARKDOWN_REGEX.lastIndex = 0

  return markdown.replace(IMAGE_MARKDOWN_REGEX, (match, alt, imagePath) => {
    // Only update paths that start with / and have a mapping
    if (imagePath.startsWith('/') && imageMap.has(imagePath)) {
      const optimizedPath = imageMap.get(imagePath)!
      return `![${alt}](${optimizedPath})`
    }
    return match
  })
}

