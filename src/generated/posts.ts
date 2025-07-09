// This file is auto-generated. Do not edit manually.
import { WritingPost } from '../utils/markdownLoader'

export const posts: WritingPost[] = []

export function getAllPosts(): WritingPost[] {
  return posts
}

export function getPostBySlug(slug: string): WritingPost | null {
  return posts.find((post) => post.slug === slug) || null
}
