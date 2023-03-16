import React, { FunctionComponent } from 'react';
import { IFlight } from '@/models/flight';
import { FlightCard } from '../FlightCard/FlightCard';

type AicraftRotationListProps = {
  flights: IFlight[];
  onItemClick: (flight: IFlight) => void;
};

export const AircraftRotationList: FunctionComponent<
  AicraftRotationListProps
> = ({ flights, onItemClick }) => {
  const isFlightListEmpty = flights?.length === 0;

  return isFlightListEmpty ? (
    <p>Theres no flights available at this moment</p>
  ) : (
    <ul className="flex flex-col items-center h-screen overflow-y-auto">
      {flights?.map((flight) => (
        <FlightCard
          flight={flight}
          key={flight.ident}
          onClick={(flight) => onItemClick(flight)}
        />
      ))}
    </ul>
  );
};
