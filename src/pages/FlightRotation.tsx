import { fetchAircrafts, fetchFlights } from '@/Api'
import { AircraftList } from '@/components/AircraftList/AircraftList'
import { AircraftRotationList } from '@/components/AircraftRotationList/AircraftRotationList'
import AircraftTimeline from '@/components/AircraftTimeline/AircraftTimeline'
import { FlightList } from '@/components/FlightList/FlightList'
import { useAircraftRotation } from '@/hooks/useAircraftRotation'
import { sortFlightList } from '@/utils/flightUtils'
import { transformAircraft, transformFlight } from '@/utils/transformers'
import { Alert } from 'antd'
import { useQueries } from 'react-query'
import { toast } from 'react-toastify'

export const FlightRotation = () => {
  const {
    selectedAircraft,
    availableFlights,
    rotation,
    setSelectedAircraft,
    setAvailableFlights,
    addFlightToRotation,
    removeFlightFromRotation,
  } = useAircraftRotation()

  const getTomorrow = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return `<< ${tomorrow.toDateString()}  >>`
  }

  const [aircraftQuery, flightQuery] = useQueries([
    {
      queryKey: ['aircraft', 1],
      queryFn: () =>
        fetchAircrafts().then((res) =>
          setSelectedAircraft(
            res.data ? res.data.map(transformAircraft)[0] : {},
          ),
        ),
    },
    {
      queryKey: ['flight', 1],
      queryFn: () =>
        fetchFlights().then((res) =>
          setAvailableFlights(
            res.data ? sortFlightList(res.data.map(transformFlight)) : [],
          ),
        ),
    },
  ])

  const { error } = flightQuery || aircraftQuery

  if (error) {
    toast.error('An error has occurred.')
  }

  return (
    <div className="bg-dark-purple">
      <div className="h-24 text-linen text-lg flex items-center justify-center">
        <p>{getTomorrow()}</p>
      </div>
      <div className=" mx-auto grid grid-cols-4">
        <div className="border">
          <h3 className="text-center text-linen mt-4 mb-8">Aircrafts</h3>
          <AircraftList
            aircrafts={[selectedAircraft]}
            onItemClick={setSelectedAircraft}
          />
        </div>
        <div className="border">
          {selectedAircraft.ident && (
            <h3 className="text-center text-linen mt-4 mb-8">
              Rotation:{' '}
              <span className="text-md">{selectedAircraft.ident}</span>
            </h3>
          )}
          <AircraftRotationList
            flights={rotation}
            onItemClick={removeFlightFromRotation}
          />
        </div>
        <div className="border col-span-2">
          <h3 className="text-center text-linen mt-4 mb-8">Flights</h3>
          <FlightList
            flights={availableFlights}
            onItemClick={addFlightToRotation}
          />
        </div>
      </div>
      <div className="border w-100">
        <AircraftTimeline
          selectedAircraft={selectedAircraft}
          rotationData={rotation}
        />
      </div>
    </div>
  )
}
