import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  getPostBySlug,
  formatDate,
  type WritingPost,
} from '../utils/markdownLoader'
import { WritingLink } from './ui/Navigation'
import MarkdownRenderer from './ui/MarkdownRenderer'

const WritingPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<WritingPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('No post slug provided')
        setLoading(false)
        return
      }

      try {
        const foundPost = await getPostBySlug(slug)
        if (foundPost) {
          setPost(foundPost)
        } else {
          setError('Post not found')
        }
      } catch (err) {
        setError('Error loading post')
        console.error('Error loading post:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  // Update document title when post is loaded
  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Jay Mahabal`
    } else {
      // Reset to default title when no post is loaded
      document.title = 'Jay Mahabal'
    }
  }, [post])

  if (loading) {
    return null
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <h1 className="text-8xl font-bold text-gray-900 mb-4">🛸</h1>
          <WritingLink className="py-4" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center text-gray-500 text-sm mb-6">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          <MarkdownRenderer content={post.content} />
        </article>
        <WritingLink className="py-4" />
      </div>
    </div>
  )
}

export default WritingPost
