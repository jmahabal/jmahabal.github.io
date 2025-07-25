import { format } from 'date-fns'
import { getAllPosts, getPostBySlug } from '../generated/posts'

export interface WritingPost {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  draft?: boolean
}

export { getAllPosts, getPostBySlug }

export function formatDate(dateString: string): string {
  return format(new Date(dateString), 'MMMM yyyy')
}
