import { IAircraft } from '@/models/aircraft'
import { IFlight } from '@/models/flight'
import { canFlightsBeGrouped } from '@/utils/aircraftRotationUtils'
import { sortFlightList } from '@/utils/flightUtils'
import { getFirstElement, getLastElement, isEmpty } from '@/utils/utils'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

type AircraftRotation = {
  selectedAircraft: IAircraft
  availableFlights: IFlight[]
  setSelectedAircraft: (aircraft: IAircraft) => void
  setAvailableFlights: (flights: IFlight[]) => void
  rotation: IFlight[]
  addFlightToRotation: (flight: IFlight) => void
  removeFlightFromRotation: (flight: IFlight) => void
}

export const useAircraftRotation = (): AircraftRotation => {
  const [selectedAircraft, setSelectedAircraft] = useState<IAircraft>(
    {} as IAircraft,
  )
  const [availableFlights, setAvailableFlights] = useState<IFlight[]>([])
  const [rotation, setRotation] = useState<IFlight[]>([])

  return {
    selectedAircraft: selectedAircraft,
    setSelectedAircraft: (aircraft: IAircraft) => {
      return setSelectedAircraft(aircraft)
    },
    availableFlights: availableFlights,
    setAvailableFlights: (flights: IFlight[]) => {
      return setAvailableFlights(flights)
    },
    rotation: rotation,
    addFlightToRotation: async (flight: IFlight) => {
      let added = false
      let firstRotationFlight = getFirstElement(rotation)
      let lastRotationFlight = getLastElement(rotation)

      if (isEmpty(rotation)) {
        setRotation([...rotation, flight])
        added = true
      } else {
        if (canFlightsBeGrouped(flight, firstRotationFlight)) {
          setRotation([flight, ...rotation])
          added = true
        }
        if (canFlightsBeGrouped(lastRotationFlight, flight)) {
          setRotation([...rotation, flight])
          added = true
        }
      }
      if (added) {
        setAvailableFlights([
          ...availableFlights.filter((item) => item.ident !== flight.ident),
        ])
        toast.success('The flight was added successfully.')
      } else {
        toast.error('This flight doesn`t meet the requirements.')
      }
    },
    removeFlightFromRotation: (flight: IFlight) => {
      const index = rotation.indexOf(flight)
      if (index !== -1) {
        setRotation([...rotation.slice(0, index)])
        setAvailableFlights(sortFlightList([...availableFlights, flight]))
        toast.info('The flight and its connected flights was removed.')
      }
      return
    },
  }
}
