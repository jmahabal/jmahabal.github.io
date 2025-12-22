import React from 'react'
import { Person } from '../types'
import { formatName } from '../utils/formatting'
import { createPersonUrl } from '../utils/navigation'
import { P } from '../../components/ui/Typography'

interface ChildrenListProps {
  children: Person[]
  currentPersonId: string
  onNavigate: (url: string) => void
  personIdsWithSlides: Set<string>
}

const ChildrenList: React.FC<ChildrenListProps> = ({
  children,
  currentPersonId,
  onNavigate,
  personIdsWithSlides,
}) => {
  if (children.length === 0) return null

  const handleChildClick = (personId: string) => {
    onNavigate(createPersonUrl(personId, currentPersonId))
  }

  const hasSlide = (personId: string) => personIdsWithSlides.has(personId)

  if (children.length === 1) {
    const child = children[0]
    const childHasSlide = hasSlide(child.id)
    return (
      <P className="text-center text-xl text-slate-800">
        One child:{' '}
        {childHasSlide ? (
          <button
            onClick={() => handleChildClick(child.id)}
            className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
          >
            {formatName(child)}
          </button>
        ) : (
          <span>{formatName(child)}</span>
        )}
      </P>
    )
  }

  return (
    <P className="text-center text-xl text-slate-800">
      {children.length} children:{' '}
      {children.map((child, index) => {
        const childHasSlide = hasSlide(child.id)
        return (
          <React.Fragment key={child.id}>
            {childHasSlide ? (
              <button
                onClick={() => handleChildClick(child.id)}
                className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
              >
                {formatName(child)}
              </button>
            ) : (
              <span>{formatName(child)}</span>
            )}
            {index < children.length - 1 && ', '}
          </React.Fragment>
        )
      })}
    </P>
  )
}

export default ChildrenList
