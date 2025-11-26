import { format } from 'date-fns'
import { getAllPosts, getPostBySlug } from '../generated/posts'

export interface WritingPost {
  slug: string
  title: string
  date: string
  description?: string
  content: string
  draft?: boolean
  imageUrl?: string
  imageDescription?: string
}

export { getAllPosts, getPostBySlug }

export function formatDate(dateString: string): string {
  return format(new Date(dateString), 'MMMM yyyy')
}
