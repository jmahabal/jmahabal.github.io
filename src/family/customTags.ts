/**
 * Custom tags that are manually maintained
 * These are not generated from the family tree data
 */
export interface TagDefinition {
  id: string
  label: string
  type: 'location' | 'generation' | 'custom' | 'family'
  description?: string
}

export const CUSTOM_TAGS: TagDefinition[] = [
  {
    id: 'NYC-Wedding',
    label: 'NYC Wedding',
    type: 'custom',
  },
  {
    id: 'WGK',
    label: 'WGK',
    type: 'custom',
  },
]

