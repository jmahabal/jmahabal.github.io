import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

/**
 * Configuration constants for image optimization
 */
const MAX_IMAGE_WIDTH = 1920
const WEBP_QUALITY = 85

/**
 * Optimize an image and create a WebP version in a separate _optimized folder
 * Works for any directory structure in the public folder.
 * @param imagePath - Public path like "/azores/header.jpeg" (example: any path starting with /)
 * @param publicDir - Absolute path to the public directory
 * @returns Optimized path like "/azores/_optimized/header.webp" or null if failed
 */
export async function optimizeImage(
  imagePath: string,
  publicDir: string,
): Promise<string | null> {
  // Convert public path (e.g., /azores/header.jpeg) to absolute path
  const publicImagePath = path.join(publicDir, imagePath.slice(1))

  // Check if source image exists
  if (!fs.existsSync(publicImagePath)) {
    console.warn(`  ⚠️  Source image not found: ${publicImagePath}`)
    return null
  }

  // Skip if source is already WebP
  const parsedPath = path.parse(publicImagePath)
  if (parsedPath.ext.toLowerCase() === '.webp') {
    // Already optimized, return the original path
    return normalizedPath(publicImagePath, publicDir)
  }

  // Create optimized path in _optimized subfolder within the same directory as the source
  // Example: public/azores/header.jpeg -> public/azores/_optimized/header.webp
  // Works for any directory structure (e.g., /photos/vacation/img.jpg -> /photos/vacation/_optimized/img.webp)
  const optimizedDir = path.join(parsedPath.dir, '_optimized')
  const optimizedPath = path.join(optimizedDir, `${parsedPath.name}.webp`)

  // Ensure the optimized directory exists
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true })
  }

  // Check if optimized version exists and is newer than source
  if (fs.existsSync(optimizedPath)) {
    const sourceStats = fs.statSync(publicImagePath)
    const optimizedStats = fs.statSync(optimizedPath)

    // If optimized version is newer or same age, skip
    if (optimizedStats.mtime >= sourceStats.mtime) {
      return normalizedPath(optimizedPath, publicDir)
    }
  }

  try {
    // Optimize image: resize to max width, convert to WebP with configured quality
    await sharp(publicImagePath)
      .resize(MAX_IMAGE_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(optimizedPath)

    const relativePath = normalizedPath(optimizedPath, publicDir)
    console.log(`  ✅ Optimized: ${imagePath} → ${relativePath}`)
    return relativePath
  } catch (error) {
    console.error(`  ❌ Error optimizing ${imagePath}:`, error)
    return null
  }
}

/**
 * Normalize a file path to a public-relative path (always uses forward slashes)
 * Ensures the path starts with / for public URLs
 */
function normalizedPath(filePath: string, publicDir: string): string {
  // Use path.relative to get the relative path, then normalize to posix format
  const relative = path.relative(publicDir, filePath)
  const normalized = path.posix.normalize(relative)
  // Ensure it starts with / for public URLs
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

/**
 * Optimize multiple images in parallel
 * Works for images in any directory structure within the public folder.
 * @param imagePaths - Array of public paths (e.g., ["/azores/header.jpeg", "/photos/vacation/img.jpg"])
 * @param publicDir - Absolute path to the public directory
 * @returns Map from original path to optimized path
 */
export async function optimizeImages(
  imagePaths: string[],
  publicDir: string,
): Promise<Map<string, string>> {
  const imageMap = new Map<string, string>()

  const optimizationPromises = imagePaths.map(async (imagePath) => {
    const optimizedPath = await optimizeImage(imagePath, publicDir)
    if (optimizedPath) {
      imageMap.set(imagePath, optimizedPath)
    }
  })

  await Promise.all(optimizationPromises)
  return imageMap
}

