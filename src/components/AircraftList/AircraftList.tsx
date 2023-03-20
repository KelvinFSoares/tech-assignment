import React, { FunctionComponent } from 'react'
import { IAircraft } from '@/models/aircraft'
import { AircraftCard } from '../AircraftCard/AircraftCard'

type AircraftListProps = {
  aircrafts: IAircraft[]
  onItemClick: (aircraft: IAircraft) => void
}

export const AircraftList: FunctionComponent<AircraftListProps> = ({
  aircrafts,
  onItemClick,
}) => {
  const isAircraftListEmpty = aircrafts?.length === 0

  return !aircrafts || isAircraftListEmpty ? (
    <p className="text-linen p-4 text-center">
      Theres no aircrafts available at this moment
    </p>
  ) : (
    <ul className="flex flex-col items-center p-4">
      {aircrafts?.map((aircraft) => (
        <AircraftCard
          aircraft={aircraft}
          onClick={onItemClick}
          key={`aircraft-${aircraft.ident}`}
        />
      ))}
    </ul>
  )
}
