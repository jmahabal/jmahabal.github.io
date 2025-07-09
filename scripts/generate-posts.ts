import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

interface PostData {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  tags?: string[]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const essaysDir = path.join(__dirname, '../src/essays')
const outputDir = path.join(__dirname, '../src/generated')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Read all markdown files
const markdownFiles = fs
  .readdirSync(essaysDir)
  .filter((file) => file.endsWith('.md'))

const posts: PostData[] = []

// Process each markdown file
markdownFiles.forEach((filename) => {
  const filePath = path.join(essaysDir, filename)
  const content = fs.readFileSync(filePath, 'utf-8')
  const { data, content: markdownContent } = matter(content)

  // Extract slug from filename
  const slug = filename.replace('.md', '')

  posts.push({
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt,
    content: markdownContent,
    tags: data.tags || [],
  })
})

// Sort by date (newest first)
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// Generate the posts data file
const postsDataContent = `// This file is auto-generated. Do not edit manually.
import { WritingPost } from '../utils/markdownLoader'

export const posts: WritingPost[] = ${JSON.stringify(posts, null, 2)}

export function getAllPosts(): WritingPost[] {
  return posts
}

export function getPostBySlug(slug: string): WritingPost | null {
  return posts.find(post => post.slug === slug) || null
}
`

// Write the generated file
fs.writeFileSync(path.join(outputDir, 'posts.ts'), postsDataContent)

console.log(`Generated posts data for ${posts.length} markdown files:`)
posts.forEach((post) => {
  console.log(`  - ${post.slug}: ${post.title}`)
})
