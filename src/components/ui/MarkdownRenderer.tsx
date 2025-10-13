import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { generateId } from '../../utils/common'
import { preprocessVerticalImages } from '../../utils/markdownHelpers'
import { useMemo } from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}
const SELECTED_THEME = nightOwl

const MarkdownRenderer = ({
  content,
  className = '',
}: MarkdownRendererProps) => {
  const processedContent = useMemo(() => preprocessVerticalImages(content), [content])

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Custom styling for different markdown elements
          h1: ({ children }) => {
            const id = generateId(children?.toString() || '')
            return (
              <h1
                id={id}
                className="mb-4 mt-14 text-3xl font-bold text-gray-900"
              >
                {children}
              </h1>
            )
          },
          h2: ({ children }) => {
            const id = generateId(children?.toString() || '')
            return (
              <h2
                id={id}
                className="mb-3 mt-12 text-2xl font-bold text-gray-900"
              >
                {children}
              </h2>
            )
          },
          h3: ({ children }) => {
            const id = generateId(children?.toString() || '')
            return (
              <h3 id={id} className="mb-2 mt-10 text-xl font-bold text-gray-900">
                {children}
              </h3>
            )
          },
          div: ({ className, children }) => (
            <div className={className}>{children}</div>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-1 pl-6 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-1 pl-6 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-2 text-gray-700">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-blue-500 pl-4 italic text-gray-600">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="rounded bg-gray-100 px-1 py-0.5 text-sm text-gray-800">
                  {children}
                </code>
              )
            }

            // Handle code blocks with syntax highlighting
            const language = className?.replace('language-', '') || 'text'
            return (
              <div className="mb-4 overflow-hidden rounded-lg">
                <SyntaxHighlighter
                  language={language}
                  style={SELECTED_THEME}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                  }}
                  showLineNumbers={false}
                  wrapLines={true}
                >
                  {String(children)}
                </SyntaxHighlighter>
              </div>
            )
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
              <figure className="my-4">
                <img src={src} alt={alt || ''} className="h-auto max-w-full rounded-sm" />
                {alt && <figcaption className="mt-2 text-center italic text-gray-600 text-sm">{alt}</figcaption>}
              </figure>
            ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2">{children}</td>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
