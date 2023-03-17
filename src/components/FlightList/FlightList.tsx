import React, { FunctionComponent } from 'react';
import { IFlight } from '@/models/flight';
import { FlightCard } from '../FlightCard/FlightCard';

type FlightListProps = {
  flights: IFlight[];
  onItemClick: (flight: IFlight) => void;
};

export const FlightList: FunctionComponent<FlightListProps> = ({
  flights,
  onItemClick,
}) => {
  const isFlightListEmpty = flights?.length === 0;

  return !flights || isFlightListEmpty ? (
    <p>Theres no flights available at this moment</p>
  ) : (
    <div className="flex flex-wrap justify-around overflow-auto">
      {flights.map((flight: IFlight) => (
        <FlightCard flight={flight} key={flight.ident} onClick={onItemClick} />
      ))}
    </div>
  );
};
