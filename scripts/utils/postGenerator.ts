import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { extractImagePaths, updateImagePaths } from './markdownHelpers.js'

export interface PostData {
  slug: string
  title: string
  date: string
  description?: string
  content: string
  draft?: boolean
  imageUrl?: string
  imageDescription?: string
}

/**
 * Read and parse a markdown file into post data
 */
export function parseMarkdownFile(
  filePath: string,
  imageMap: Map<string, string>,
): PostData {
  const content = fs.readFileSync(filePath, 'utf-8')
  const { data, content: markdownContent } = matter(content)

  // Update markdown content to use optimized images
  const optimizedContent = updateImagePaths(markdownContent, imageMap)

  // Extract slug from filename
  const filename = path.basename(filePath)
  const slug = filename.replace('.md', '')

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description,
    content: optimizedContent,
    draft: data.draft || false,
    imageUrl: data.imageUrl,
    imageDescription: data.imageDescription,
  }
}

/**
 * Collect all image paths from all markdown files
 * This reads each file once to extract image paths efficiently
 */
export function collectImagePathsFromFiles(
  markdownFiles: string[],
  essaysDir: string,
): string[] {
  const allImagePaths = new Set<string>()

  for (const filename of markdownFiles) {
    const filePath = path.join(essaysDir, filename)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { content: markdownContent } = matter(content)
    const imagePaths = extractImagePaths(markdownContent)
    for (const imagePath of imagePaths) {
      allImagePaths.add(imagePath)
    }
  }

  return Array.from(allImagePaths)
}

/**
 * Generate the TypeScript content for the posts data file
 */
export function generatePostsFileContent(posts: PostData[]): string {
  return `// This file is auto-generated. Do not edit manually.
import { WritingPost } from '../utils/markdownLoader'

export const posts: WritingPost[] = ${JSON.stringify(posts, null, 2)}

export function getAllPosts(): WritingPost[] {
  return posts.filter(post => !post.draft)
}

export function getPostBySlug(slug: string): WritingPost | null {
  return posts.find(post => post.slug === slug) || null
}
`
}

