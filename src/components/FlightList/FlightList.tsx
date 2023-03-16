import React, { FunctionComponent } from 'react';
import { IFlight } from '@/models/flight';
import { FlightCard } from '../FlightCard/FlightCard';

type FlightListProps = {
  flights: IFlight[];
  onItemClick: (flight: IFlight) => boolean;
};

export const FlightList: FunctionComponent<FlightListProps> = ({
  flights,
  onItemClick,
}) => {
  const isFlightListEmpty = flights?.length === 0;

  return isFlightListEmpty ? (
    <p>Theres no flights available at this moment</p>
  ) : (
    <ul className="h-screen overflow-y-auto">
      {flights?.map((flight) => (
        <FlightCard flight={flight} key={flight.ident} onClick={onItemClick} />
      ))}
    </ul>
  );
};
