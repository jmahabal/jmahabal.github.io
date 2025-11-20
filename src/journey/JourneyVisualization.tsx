import { useState, useEffect, lazy, Suspense } from 'react'
import { generateLiteraryText } from './journeyTextGenerator'
import type { JourneyStep, JourneyData } from './journeyData'
import { trashJourney, compostJourney } from './journeyData'

// Dynamically import the map component to avoid SSR issues
const JourneyMap = lazy(() => import('./JourneyMap'))

const JourneyCardText = ({ data }: { data: JourneyData }) => {
  const renderTextWithBadges = (text: string, step: JourneyStep) => {
    // Map of method descriptions to method names
    const methodDescriptions: Record<string, string> = {
      'collects it': 'Collection',
      'transports it by truck': 'Truck',
      'carries it by barge': 'Barge',
      'ships it by train': 'Train',
    }

    // Find which method description is used in text
    let methodText = step.method
    for (const [desc, method] of Object.entries(methodDescriptions)) {
      if (step.method === method && text.toLowerCase().includes(desc.toLowerCase())) {
        methodText = desc
        break
      }
    }

    // Create array of data references to find (location and method)
    const dataRefs: string[] = [step.location]
    if (methodText !== step.method) {
      dataRefs.push(methodText)
    } else {
      dataRefs.push(step.method)
    }

    // Find all matches with their positions
    const matches: Array<{ index: number; length: number; text: string }> = []
    
    dataRefs.forEach((ref) => {
      const regex = new RegExp(ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      let match: RegExpExecArray | null
      while ((match = regex.exec(text)) !== null) {
        // Check if this match overlaps with an existing match
        const overlaps = matches.some(
          (m) => !(match!.index + match![0].length <= m.index || match!.index >= m.index + m.length)
        )
        if (!overlaps) {
          matches.push({
            index: match.index,
            length: match[0].length,
            text: match[0],
          })
        }
      }
    })

    // Sort matches by index
    matches.sort((a, b) => a.index - b.index)

    // Build parts array
    const parts: Array<{ text: string; isData: boolean }> = []
    let lastIndex = 0

    matches.forEach((match) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({
          text: text.substring(lastIndex, match.index),
          isData: false,
        })
      }
      // Add data reference
      parts.push({
        text: match.text,
        isData: true,
      })
      lastIndex = match.index + match.length
    })

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        text: text.substring(lastIndex),
        isData: false,
      })
    }

    // If no matches, return original text
    if (parts.length === 0) {
      parts.push({ text, isData: false })
    }

    return parts.map((part, idx) => {
      if (part.isData) {
        return (
          <span
            key={idx}
            className="text-gray-200 border-b border-gray-600"
          >
            {part.text}
          </span>
        )
      }
      return <span key={idx}>{part.text}</span>
    })
  }

  return (
    <div className="bg-gray-900 max-w-[400px]" style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-baseline justify-between">
          <h1 className="text-xl font-normal text-gray-100">
            {data.itemName}
          </h1>
          <p className="text-sm text-gray-500 font-normal">{data.itemCategory}</p>
        </div>
      </div>

      {/* Text Content */}
      <div className="px-6 pb-8">
        <div className="space-y-5 text-base leading-relaxed text-gray-300">
          {data.journey.map((step, index) => {
            const text = generateLiteraryText(step, index, data.journey.length, data.itemCategory, data.itemName)
            return (
              <p key={index} className="text-justify">
                {renderTextWithBadges(text, step)}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const JourneyCard = ({ data }: { data: JourneyData }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="bg-white border border-gray-200 max-w-[400px]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-2xl">
            {data.itemIcon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900">
                {data.itemName}
              </h1>
            </div>
            <p className="text-sm text-gray-500">{data.itemCategory}</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="border-b border-gray-200">
        <div className="h-64 w-full">
          {isMounted ? (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500">
                  Loading map...
                </div>
              }
            >
              <JourneyMap 
                journey={data.journey} 
                routeColor={data.routeColor}
                center={data.mapCenter}
                zoom={data.mapZoom}
              />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500">
              Loading map...
            </div>
          )}
        </div>
      </div>

      {/* Journey Steps */}
      <div className="px-4 py-6">

        <div className="space-y-6">
          {data.journey.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < data.journey.length - 1 && (
                <div
                  className="absolute left-6 top-12 h-full w-0.5"
                  style={{ backgroundColor: data.routeColor, opacity: 0.3 }}
                />
              )}

              {/* Step content */}
              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border-2 text-2xl"
                  style={{ borderColor: data.routeColor }}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex-1 items-center flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {step.location}
                    </h3>
                    <div
                      className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs"
                      style={{
                        backgroundColor: `${data.routeColor}20`,
                        color: data.routeColor,
                      }}
                    >
                      <span>→</span>
                      {step.method}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  )
}

const JourneyVisualization = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-[auto,1fr] gap-6 lg:items-start">
          <JourneyCard data={trashJourney} />
          <JourneyCardText data={trashJourney} />
          <JourneyCard data={compostJourney} />
        </div>
      </div>
    </div>
  )
}

export default JourneyVisualization

