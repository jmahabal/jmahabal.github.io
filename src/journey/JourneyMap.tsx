import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { JourneyStep } from './journeyData'

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

type JourneyMapProps = {
  journey: JourneyStep[]
  routeColor: string
  center?: [number, number]
  zoom?: number
}

const JourneyMap = ({ journey, routeColor, center, zoom }: JourneyMapProps) => {
  const routeCoordinates = journey.map((step) => step.coordinates)
  
  // Calculate center from route if not provided
  const mapCenter = center || [
    (Math.max(...routeCoordinates.map(c => c[0])) + Math.min(...routeCoordinates.map(c => c[0]))) / 2,
    (Math.max(...routeCoordinates.map(c => c[1])) + Math.min(...routeCoordinates.map(c => c[1]))) / 2,
  ] as [number, number]
  
  const mapZoom = zoom || 9

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Polyline
        positions={routeCoordinates}
        pathOptions={{
          color: routeColor,
          weight: 3,
          opacity: 0.7,
        }}
      />
      {journey.map((step, index) => (
        <Marker key={index} position={step.coordinates}>
          <Popup>
            <div>
              <div className="text-base font-semibold">{step.location}</div>
              <div className="text-sm text-gray-600">{step.description}</div>
              <div className="mt-1 text-xs" style={{ color: routeColor }}>
                {step.method}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default JourneyMap

