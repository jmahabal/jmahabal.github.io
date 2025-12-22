export interface Image {
  url: string
}

export interface Person {
  id: string // UUID for matching across slides
  name: string // Base name without honorific
  honorific?: string // Optional honorific (e.g., "ajoba", "maushi", "kaka")
  image?: Image // Optional image for the person
  location?: string // Optional location for the person
  deceased?: boolean // Whether the person has passed away
  totalSiblings?: number // Total number of siblings (for displaying "Child #1 / N")
  generation?: number // Generation number (0 for oldest, increments for each generation)
  gender?: 'male' | 'female' | 'other' // Optional gender/sex
  tags?: string[] // Optional array of tag names/IDs for filtering
  notes?: string // Optional text notes about the person
  familyName?: string // Family name (e.g., "Kanetkar", "Wadegaonkar")
  spouseId?: string // ID of spouse/partner
  childrenIds?: string[] // Array of child person IDs
  parentIds?: string[] // Array of parent person IDs (typically 1-2 parents)
}

export interface FamilySlide {
  childIndex: number | string // Which child in parent's children array (1-indexed, e.g., 1 for "Child #1") or descriptive string (e.g., "Great-Grandfather")
  couple: {
    partner1Id: string // Reference to person ID
    partner2Id?: string // Optional reference to person ID (for single-person slides)
  }
  childrenIds: string[] // Array of child person IDs
  backgroundColor?: string // Optional, defaults to light pink
}

export interface FamilyData {
  people: Person[]
}

// Resolved slide with Person objects instead of IDs
export interface ResolvedFamilySlide
  extends Omit<FamilySlide, 'couple' | 'childrenIds'> {
  familyName: string // Derived from the couple and children
  couple: {
    partner1: Person
    partner2?: Person // Optional partner (for single-person slides)
  }
  children: Person[]
  breadcrumb?: string[] // Array of ancestor names from root to current generation
}
