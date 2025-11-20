import type { JourneyStep } from './journeyData'

const getLocationType = (location: string): string => {
  const lower = location.toLowerCase()
  if (lower.includes('park') || lower.includes('greenmarket')) return 'origin'
  if (lower.includes('station') || lower.includes('collection')) return 'transfer'
  if (lower.includes('island') || lower.includes('barge')) return 'transit'
  if (lower.includes('landfill') || lower.includes('dump')) return 'landfill'
  if (lower.includes('compost') || lower.includes('facility')) return 'facility'
  return 'unknown'
}

const getMethodDescription = (method: string): string => {
  const methodMap: Record<string, string> = {
    Collection: 'collects it',
    Truck: 'transports it by truck',
    Barge: 'carries it by barge',
    Train: 'ships it by train',
  }
  return methodMap[method] || method.toLowerCase()
}

export const generateLiteraryText = (
  step: JourneyStep,
  index: number,
  total: number,
  category: string,
  itemName: string
): string => {
  const isTrash = category.toLowerCase().includes('trash')
  const isCompost = category.toLowerCase().includes('compost')
  const isFirst = index === 0
  const isLast = index === total - 1
  const locationType = getLocationType(step.location)
  const methodDesc = getMethodDescription(step.method)
  const itemNameLower = itemName.toLowerCase()

  // Opening paragraph - Charon receives the soul
  if (isFirst) {
    const locationDescriptors = {
      origin: [
        `At ${step.location}, the ${itemNameLower} is cast aside. Its purpose in the world above is complete. Charon notices it, as he has noticed countless others, and approaches.`,
        `The ${itemNameLower} comes to Charon at ${step.location}. The living world releases it. He ${methodDesc} and prepares for what comes next.`,
        `From ${step.location}, the ${itemNameLower} enters Charon's domain.`,
      ]
    }
    
    const descriptors = locationDescriptors[locationType as keyof typeof locationDescriptors] || [
      `Charon receives the ${itemNameLower} at ${step.location}. He ${methodDesc} and begins the crossing.`
    ]
    
    const selected = descriptors[Math.floor(Math.random() * descriptors.length)]
    
    if (isTrash) {
      return `${selected} This one will travel far from its origin, across rivers and borders, to a place of final rest. Such is the price of civilization.`
    } else if (isCompost) {
      return `${selected} This one's path differs. It does not travel far, but transforms. It seeks not distance but renewal, not exile but return.`
    }
    return `${selected}`
  }

  // Middle paragraphs - Charon ferries across
  if (!isFirst && !isLast) {
    const transitDescriptors = {
      transfer: isTrash
        ? [
            `Charon ${methodDesc} to ${step.location}. He gathers this ${itemNameLower} with others of its kind. They are many. The crossing requires coordination. The city's systems are his river.`,
            `Charon ${methodDesc} to ${step.location}. Here they prepare for the deeper crossing. Containerized and sealed, ready for what lies ahead.`,
          ]
        : [
            `Charon ${methodDesc} to ${step.location}. He sees this ${itemNameLower} for what it might become. Moving it toward transformation. This crossing is not one of distance but of becoming.`,
            `Charon ${methodDesc} to ${step.location}. The journey toward renewal continues. He is its guide.`,
          ],
      transit: isTrash
        ? [
            `Charon ${methodDesc} to ${step.location}. The water stretches before them. The ${itemNameLower} crosses with him, leaving the city that birthed it behind.`,
            `Charon ${methodDesc} to ${step.location}. The ${itemNameLower} travels with him, crossing boundaries both geographic and eternal.`,
          ]
        : [
            `Charon ${methodDesc} to ${step.location}. The transformation draws nearer. He guides it closer to renewal.`,
          ],
    }

    const descriptors = transitDescriptors[locationType as keyof typeof transitDescriptors] || [
      `Charon ${methodDesc} to ${step.location}. Each crossing is part of a larger passage. Each movement a step in a journey he has made countless times.`
    ]

    return descriptors[Math.floor(Math.random() * descriptors.length)]
  }

  // Final paragraph - Charon delivers to the afterlife
  if (isLast) {
    if (locationType === 'landfill') {
      return `After many days, after trucks and barges and trains carry them across state lines, Charon delivers the ${itemNameLower} to its final destination: ${step.location}. Here, in this place of layers and rest, it remains far from the city of its origin. The infrastructure that brought them here spans hundreds of miles. The crossing is complete.`
    } else if (locationType === 'facility') {
      return `Charon brings the ${itemNameLower} to ${step.location}, where its purpose renews. In this place of transformation, it breaks down and becomes something else. It returns in a cycle of regeneration. Here, what was cast aside becomes nourishment. He has ferried it not to an end, but to a beginning. The crossing is complete. The journey continues in another form.`
    }
    return `Charon completes the crossing. He delivers the ${itemNameLower} to ${step.location}. He ${methodDesc}. The journey through the city's infrastructure is done. He has been its guide.`
  }

  return `Charon continues the crossing. Each transfer is a passage he has made before. Each movement requires the infrastructure and coordination that makes such journeys possible.`
}

