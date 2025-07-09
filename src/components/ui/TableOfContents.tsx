import { useEffect, useState } from 'react'
import { generateId } from '../../utils/common'
import { cn } from '../../utils/cn'
import { H3 } from './Typography'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  title?: string
  className?: string
}

const TableOfContents = ({
  content,
  title = '',
  className = '',
}: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const extractedHeadings: Heading[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = generateId(text)

      extractedHeadings.push({ id, text, level })
    }

    setHeadings(extractedHeadings)
  }, [content])

  // Handle intersection observer for active heading
  useEffect(() => {
    if (headings.length === 0) return

    const intersectingElements = new Set<string>()
    let lastScrollY = window.scrollY

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingElements.add(entry.target.id)
          } else {
            intersectingElements.delete(entry.target.id)
          }
        })

        // Determine the most appropriate active heading
        const currentScrollY = window.scrollY
        const isScrollingUp = currentScrollY < lastScrollY
        lastScrollY = currentScrollY

        if (intersectingElements.size === 0) {
          // No elements intersecting, find the closest one above
          const viewportTop = window.scrollY + 100 // Offset for better UX
          let closestHeading = ''
          let minDistance = Infinity

          headings.forEach((heading) => {
            const element = document.getElementById(heading.id)
            if (element) {
              const distance = viewportTop - element.offsetTop
              if (distance > 0 && distance < minDistance) {
                minDistance = distance
                closestHeading = heading.id
              }
            }
          })

          if (closestHeading) {
            setActiveId(closestHeading)
          }
        } else if (intersectingElements.size === 1) {
          // Only one element intersecting
          setActiveId(Array.from(intersectingElements)[0])
        } else {
          // Multiple elements intersecting, choose based on scroll direction
          const intersectingIds = Array.from(intersectingElements)
          const elements = intersectingIds
            .map((id) => {
              const element = document.getElementById(id)
              return element ? { id, top: element.offsetTop } : null
            })
            .filter(Boolean)
            .sort((a, b) => (a?.top || 0) - (b?.top || 0))

          if (elements.length > 0) {
            // When scrolling up, prefer the first (topmost) intersecting element
            // When scrolling down, prefer the last (bottommost) intersecting element
            const targetIndex = isScrollingUp ? 0 : elements.length - 1
            setActiveId(elements[targetIndex]?.id || '')
          }
        }
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
        className,
      )}
    >
      <nav className="space-y-2">
        <ul className="space-y-1">
          <H3 className="mb-4 flex text-base font-bold leading-tight">
            {title}
          </H3>
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  'block w-full text-left text-sm transition-colors hover:text-blue-600',
                  activeId === heading.id
                    ? 'font-medium text-blue-600'
                    : 'text-gray-600',
                  heading.level === 1
                    ? 'font-semibold'
                    : heading.level === 2
                      ? 'ml-0'
                      : 'ml-4',
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContents
