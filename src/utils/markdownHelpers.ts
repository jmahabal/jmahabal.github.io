/**
 * Checks if a line is a vertical start comment
 */
export const isVerticalStartComment = (line: string): boolean => {
  return /<!--\s*vertical\s*-->/.test(line.trim())
}

/**
 * Checks if a line is a vertical end comment
 */
export const isVerticalEndComment = (line: string): boolean => {
  return /<!--\s*end\s+vertical\s*-->/.test(line.trim())
}

/**
 * Extracts the image markdown from a line, or returns null if not an image
 */
export const extractImageMarkdown = (line: string): string | null => {
  const match = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/)
  return match ? match[0] : null
}

/**
 * Converts markdown image syntax to HTML img tag
 */
export const markdownImageToHtml = (markdown: string): string => {
  const match = markdown.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/)
  if (!match) return markdown
  const alt = match[1] || ''
  const src = match[2] || ''
  // Escape HTML attributes to prevent XSS
  const escapedAlt = alt.replace(/"/g, '&quot;')
  const escapedSrc = src.replace(/"/g, '&quot;')
  return `<img src="${escapedSrc}" alt="${escapedAlt}" class="h-auto w-full max-w-full rounded-lg object-contain" />`
}

/**
 * Collects images between vertical start and end comments
 */
export const collectVerticalImages = (
  lines: string[],
  startIndex: number,
): { images: string[]; nextIndex: number } => {
  const images: string[] = []
  let currentIndex = startIndex

  while (currentIndex < lines.length) {
    const currentLine = lines[currentIndex]

    if (isVerticalEndComment(currentLine)) {
      return { images, nextIndex: currentIndex + 1 }
    }

    const imageMarkdown = extractImageMarkdown(currentLine)
    if (imageMarkdown) {
      images.push(imageMarkdown)
    }

    currentIndex = currentIndex + 1
  }

  return { images, nextIndex: currentIndex }
}

/**
 * Wraps vertical images in HTML container divs
 */
export const wrapVerticalImagesInHtml = (images: string[]): string[] => {
  if (images.length === 0) {
    return []
  }

  if (images.length === 1) {
    // Single vertical image - centered
    const imgHtml = markdownImageToHtml(images[0])
    return [
      '<div class="my-6 clear-both max-w-full mx-auto grid grid-cols-2 gap-4">',
      '<div class="col-span-2 justify-self-center md:max-w-[calc((100%-1rem)/2)] m-0">',
      imgHtml,
      '</div>',
      '</div>',
    ]
  }

  // Multiple vertical images - two column layout
  const result = ['<div class="my-6 clear-both max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">']
  images.forEach((img) => {
    const imgHtml = markdownImageToHtml(img)
    result.push(`<div class="flex justify-center m-0 w-full flex flex-col">${imgHtml}</div>`)
  })
  result.push('</div>')
  return result
}

/**
 * Pre-processes markdown content to wrap vertical images in containers
 * Looks for <!-- vertical --> start and <!-- end vertical --> end markers
 */
export const preprocessVerticalImages = (content: string): string => {
  const lines = content.split('\n')
  const processedLines: string[] = []
  let currentIndex = 0

  while (currentIndex < lines.length) {
    const currentLine = lines[currentIndex]

    // Check if this is a vertical start marker
    if (isVerticalStartComment(currentLine)) {
      // Skip the start marker line
      const imageStartIndex = currentIndex + 1
      
      // Collect images until we find the end marker
      const { images, nextIndex } = collectVerticalImages(lines, imageStartIndex)
      
      if (images.length > 0) {
        // Wrap images in HTML containers
        const htmlWrapped = wrapVerticalImagesInHtml(images)
        processedLines.push(...htmlWrapped)
      }
      
      currentIndex = nextIndex
      continue
    }

    // Skip end markers (they're consumed by collectVerticalImages)
    if (isVerticalEndComment(currentLine)) {
      currentIndex = currentIndex + 1
      continue
    }

    processedLines.push(currentLine)
    currentIndex = currentIndex + 1
  }

  return processedLines.join('\n')
}

