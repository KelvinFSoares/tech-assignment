import React, { FunctionComponent } from 'react'
import { IFlight } from '@/models/flight'
import { FlightCard } from '../FlightCard/FlightCard'

type AicraftRotationListProps = {
  flights: IFlight[]
  onItemClick: (flight: IFlight) => void
}

export const AircraftRotationList: FunctionComponent<AicraftRotationListProps> = ({
  flights,
  onItemClick,
}) => {
  const isFlightListEmpty = flights?.length === 0

  return isFlightListEmpty ? (
    <p className="text-center text-linen p-4">
      Select one flight from the flighs available to start the rotation
    </p>
  ) : (
    <ul className="flex flex-col items-center overflow-y-auto p-4">
      {flights?.map((flight, index) => (
        <FlightCard
          flight={flight}
          key={flight.ident}
          onClick={(flight) => onItemClick(flight)}
          data-testid={`rotation-card-element-${index}`}
        />
      ))}
    </ul>
  )
}
