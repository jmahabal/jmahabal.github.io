import React, { useEffect } from 'react'
import FamilySlideshow from './FamilySlideshow'
import peopleData from './people.json'
import { FamilyData } from './types'

const FamilyPage: React.FC = () => {
  const data: FamilyData = {
    people: peopleData,
  }

  useEffect(() => {
    document.title = 'Family Tree - Jay Mahabal'
  }, [])

  return <FamilySlideshow data={data} />
}

export default FamilyPage
