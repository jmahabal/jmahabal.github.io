export type JourneyStep = {
  location: string
  description: string
  distance?: string
  method: string
  icon: string
  coordinates: [number, number] // [lat, lng]
}

export type JourneyData = {
  itemName: string
  itemCategory: string
  itemIcon: string
  startingZip: string
  journey: JourneyStep[]
  routeColor: string
  mapCenter?: [number, number]
  mapZoom?: number
  infrastructure: {
    vehicles: string
    distance: string
  }
}

export const trashJourney: JourneyData = {
  itemName: 'Orange Peel',
  itemCategory: 'Trash',
  itemIcon: '🍊',
  startingZip: '10024',
  routeColor: '#3b82f6', // blue
  mapCenter: [39.2, -75.7], // Center between NYC and Virginia
  mapZoom: 6, // Zoomed out to show full route
  journey: [
    {
      location: 'Central Park Trash Can',
      description: 'Disposed in park trash can',
      method: 'Collection',
      icon: '🗑️',
      coordinates: [40.7829, -73.9654],
    },
    {
      location: 'DSNY Station — 59th St',
      description: 'Marine transfer station',
      distance: '2.1 miles',
      method: 'Truck',
      icon: '🚛',
      coordinates: [40.7614, -73.9776],
    },
    {
      location: 'Staten Island',
      description: 'Containerized and loaded onto barge',
      distance: '15 miles via East River',
      method: 'Barge',
      icon: '🚢',
      coordinates: [40.5795, -74.1502],
    },
    {
      location: 'Virginia Landfill',
      description: 'Final destination',
      distance: '350 miles',
      method: 'Train',
      icon: '🚂',
      coordinates: [37.5407, -77.4360],
    },
  ],
  infrastructure: {
    vehicles: '1 truck, 1 barge, 1 train',
    distance: '~367 miles total',
  },
}

export const compostJourney: JourneyData = {
  itemName: 'Orange Peel',
  itemCategory: 'Compost',
  itemIcon: '🍊',
  startingZip: '11205', // Fort Greene, Brooklyn
  routeColor: '#10b981', // green
  journey: [
    {
      location: 'Fort Greene Greenmarket',
      description: 'Disposed at greenmarket compost collection',
      method: 'Collection',
      icon: '♻️',
      coordinates: [40.6914, -73.9767], // Fort Greene Greenmarket
    },
    {
      location: 'DSNY Compost Collection',
      description: 'Compost pickup and sorting',
      distance: '3.5 miles',
      method: 'Truck',
      icon: '🚛',
      coordinates: [40.7614, -73.9776],
    },
    {
      location: 'Fresh Kills Composting Facility',
      description: '33-acre composting facility - repurposed into soil',
      distance: '15 miles',
      method: 'Truck',
      icon: '🌱',
      coordinates: [40.5776, -74.1917], // Fresh Kills, Staten Island
    },
  ],
  infrastructure: {
    vehicles: '1-2 trucks',
    distance: '~17 miles total',
  },
}

