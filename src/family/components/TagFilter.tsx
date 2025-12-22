import { useMemo } from 'react'
import { getTagLabel } from '../tags'
import { Person } from '../types'
import { Button } from '../../components/ui/button'
import {
  getLocationTagIds,
  getGenerationTagIds,
  getFamilyTagIds,
  getCustomTagIds,
} from '../hooks'

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagChange: (tags: string[]) => void
  onReset?: () => void
  tagCounts?: Map<string, number>
  people: Person[]
}

const TagFilter = ({
  tags,
  selectedTags,
  onTagChange,
  onReset,
  tagCounts,
  people,
}: TagFilterProps) => {
  // Always show all location tags (users can filter even if it returns no results)
  const locationTags = useMemo(() => {
    return getLocationTagIds(people)
  }, [people])

  // Always show all generation tags (they represent relationship levels)
  const generationTags = useMemo(() => {
    return getGenerationTagIds(people)
  }, [people])

  // Always show all family tags (they represent relationship categories)
  const familyTags = useMemo(() => {
    return getFamilyTagIds(people)
  }, [people])

  const customTags = useMemo(() => getCustomTagIds(people), [people])

  if (tags.length === 0) return null

  const hasSelectedTags = selectedTags.length > 0

  const handleReset = () => {
    if (onReset) {
      onReset()
    } else {
      // Fallback: just clear tags if onReset not provided
      onTagChange([])
    }
  }

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagChange([...selectedTags, tag])
    }
  }

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    tagType: 'location' | 'generation' | 'family',
  ) => {
    const selectedTag = e.target.value

    // Remove any existing tags of this type from selection
    const tagsToRemove =
      tagType === 'location'
        ? locationTags
        : tagType === 'generation'
          ? generationTags
          : familyTags
    const filteredTags = selectedTags.filter(
      (tag) => !tagsToRemove.includes(tag),
    )

    // If a tag was selected, add it; otherwise just clear (selectedTag is empty string)
    if (selectedTag) {
      onTagChange([...filteredTags, selectedTag])
    } else {
      onTagChange(filteredTags)
    }
  }

  const getSelectedLocation = () => {
    return selectedTags.find((tag) => locationTags.includes(tag)) || ''
  }

  const getSelectedGeneration = () => {
    return selectedTags.find((tag) => generationTags.includes(tag)) || ''
  }

  const getSelectedFamily = () => {
    return selectedTags.find((tag) => familyTags.includes(tag)) || ''
  }

  // Helper to format tag label with count (only for filter tags, not custom tags)
  const formatTagLabel = (
    tag: string,
    includeCount: boolean = true,
  ): string => {
    const label = getTagLabel(tag, people)
    if (!includeCount) return label
    const count = tagCounts?.get(tag)
    return count !== undefined ? `${label} (${count})` : label
  }

  return (
    <div className="flex flex-col gap-2 items-end">
      <div className="flex flex-wrap gap-3 items-center justify-end">
        {/* Reset Button - always rendered to prevent layout shift */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className={`mr-auto transition-opacity ${
            hasSelectedTags
              ? 'opacity-100 text-blue-600 hover:text-blue-700'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          Reset
        </Button>

        {/* Location Select */}
        {locationTags.length > 0 && (
          <select
            value={getSelectedLocation()}
            onChange={(e) => handleSelectChange(e, 'location')}
            className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="">Location...</option>
            {locationTags.map((tag: string) => (
              <option key={tag} value={tag}>
                {formatTagLabel(tag)}
              </option>
            ))}
          </select>
        )}

        {/* Generation Select */}
        {generationTags.length > 0 && (
          <select
            value={getSelectedGeneration()}
            onChange={(e) => handleSelectChange(e, 'generation')}
            className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="">Generation...</option>
            {generationTags.map((tag: string) => (
              <option key={tag} value={tag}>
                {formatTagLabel(tag)}
              </option>
            ))}
          </select>
        )}

        {/* Family Select */}
        {familyTags.length > 0 && (
          <select
            value={getSelectedFamily()}
            onChange={(e) => handleSelectChange(e, 'family')}
            className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="">Family...</option>
            {familyTags.map((tag: string) => (
              <option key={tag} value={tag}>
                {formatTagLabel(tag)}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Custom Tags as Buttons */}
      {customTags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center justify-end">
          {customTags.map((tag: string) => {
            const isSelected = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`rounded-full border px-2 py-1 text-xs font-normal transition-colors ${
                  isSelected
                    ? 'border-blue-400 bg-blue-100 text-blue-700'
                    : 'border-blue-200 bg-white text-slate-700 hover:bg-blue-50'
                }`}
              >
                {formatTagLabel(tag, false)}
                {isSelected && ' ✅'}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TagFilter
