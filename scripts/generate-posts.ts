import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { optimizeImages } from './utils/imageOptimizer.js'
import {
  collectImagePathsFromFiles,
  generatePostsFileContent,
  parseMarkdownFile,
  type PostData,
} from './utils/postGenerator.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const essaysDir = path.join(__dirname, '../src/essays')
const outputDir = path.join(__dirname, '../src/generated')
const publicDir = path.join(__dirname, '../public')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Read all markdown files
const markdownFiles = fs
  .readdirSync(essaysDir)
  .filter((file) => file.endsWith('.md'))

/**
 * Main function to generate posts with optimized images
 */
async function main() {
  // Step 1: Collect all image paths from markdown files
  console.log('🖼️  Collecting images from markdown files...')
  const allImagePaths = collectImagePathsFromFiles(markdownFiles, essaysDir)

  // Step 2: Optimize all images
  console.log(`🖼️  Optimizing ${allImagePaths.length} images...`)
  const imageMap = await optimizeImages(allImagePaths, publicDir)

  // Step 3: Process markdown files into posts
  console.log(`\n📝 Processing ${markdownFiles.length} markdown files...`)
  const posts: PostData[] = markdownFiles.map((filename) => {
    const filePath = path.join(essaysDir, filename)
    return parseMarkdownFile(filePath, imageMap)
  })

  // Step 4: Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Step 5: Generate and write the posts data file
  const postsDataContent = generatePostsFileContent(posts)
  fs.writeFileSync(path.join(outputDir, 'posts.ts'), postsDataContent)

  // Step 6: Output summary
  console.log(`\n✅ Generated posts data for ${posts.length} markdown files:`)
  posts.forEach((post) => {
    console.log(`  - ${post.slug}: ${post.title}`)
  })
}

// Run the main function
main().catch((error) => {
  console.error('Error running generate-posts:', error)
  process.exit(1)
})
