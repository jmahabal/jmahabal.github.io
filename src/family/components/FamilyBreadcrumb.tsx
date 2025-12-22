import React from 'react'
import { H6 } from '../../components/ui/Typography'
import { createPersonUrlByName } from '../utils/navigation'

interface BreadcrumbProps {
  breadcrumb: string[]
  childIndexDisplay: string
  currentPersonId: string
  onNavigate: (url: string) => void
}

const FamilyBreadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumb,
  childIndexDisplay,
  currentPersonId,
  onNavigate,
}) => {
  const handleBreadcrumbClick = (name: string) => {
    onNavigate(createPersonUrlByName(name, currentPersonId))
  }

  // Don't show childIndexDisplay if it's "Unknown"
  const showChildIndex = childIndexDisplay !== 'Unknown'

  // If only one person in breadcrumb, just show name and childIndexDisplay
  if (breadcrumb.length <= 1) {
    return (
      <div className="flex items-center gap-2">
        <H6 className="text-xl font-medium text-slate-700">{breadcrumb[0]}</H6>
        {showChildIndex && (
          <H6 className="text-xl font-medium text-slate-700">
            ({childIndexDisplay})
          </H6>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {breadcrumb.map((name, index) => {
        const isLast = index === breadcrumb.length - 1
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <>
                <H6 className="text-xl font-medium text-slate-700">{name}</H6>
                {showChildIndex && (
                  <H6 className="text-xl font-medium text-slate-700">
                    ({childIndexDisplay})
                  </H6>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => handleBreadcrumbClick(name)}
                  className="text-xl font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                >
                  {name}
                </button>
                <span className="text-xl font-medium text-slate-700">→</span>
              </>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default FamilyBreadcrumb
