import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const matches = content.matchAll(/^(#{1,6})\s+(.+)$/gm)
    const extractedHeadings = Array.from(matches).map((match) => ({
      level: match[1].length,
      text: match[2].trim(),
      id: generateId(match[2].trim()),
    }))
    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    if (headings.length === 0) return

    const intersecting = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id)
          } else {
            intersecting.delete(entry.target.id)
          }
        })

        if (intersecting.size === 0) {
          const viewportTop = window.scrollY + 100
          const closest = headings
            .map((h) => ({
              id: h.id,
              distance: viewportTop - (document.getElementById(h.id)?.offsetTop ?? Infinity),
            }))
            .filter((h) => h.distance > 0)
            .sort((a, b) => a.distance - b.distance)[0]
          setActiveIds(closest ? new Set([closest.id]) : new Set())
        } else {
          setActiveIds(new Set(intersecting))
        }
      },
      { rootMargin: '-10% 0px -20% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
      <nav className="relative space-y-2">
        <ul>
          <H3 className="mb-4 flex text-base font-bold leading-tight">
            {title}
          </H3>
          {headings.map((heading) => {
            const isActive = activeIds.has(heading.id)
            return (
              <li key={heading.id} className="relative">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={heading.id}
                      className="absolute left-[-8px] top-0 bottom-0 w-0.5 bg-blue-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={cn(
                    'relative block w-full text-left text-sm transition-colors hover:text-blue-600',
                    isActive ? 'font-medium text-blue-600' : 'text-gray-600',
                    heading.level === 1 && 'font-semibold',
                    heading.level > 2 && 'ml-2',
                    heading.level > 3 && 'ml-4',
                  )}
                >
                  {heading.text}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContents
