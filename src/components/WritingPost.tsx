import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  getPostBySlug,
  formatDate,
  type WritingPost,
} from '../utils/markdownLoader'
import { WritingLink } from './ui/Navigation'
import MarkdownRenderer from './ui/MarkdownRenderer'
import TableOfContents from './ui/TableOfContents'

const WritingPostComponent = () => {
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
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
          <h1 className="mb-4 text-8xl font-bold text-gray-900">🛸</h1>
          <WritingLink className="py-4" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          {/* Table of Contents */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <TableOfContents content={post.content} title={post.title} />
              <WritingLink className="py-4 text-[16px]" />
            </div>
          </div>

          {/* Main content */}
          <div>
            <article className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <header className="mb-8">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">
                  {post.title}
                </h1>

                <div className="mb-6 flex items-center text-sm text-gray-500">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
              </header>

              <MarkdownRenderer content={post.content} />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WritingPostComponent
