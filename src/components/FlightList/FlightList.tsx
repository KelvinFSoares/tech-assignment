import React, { FunctionComponent } from 'react';
import { Flight } from '@/models/flight';
import { FlightCard } from '../FlightCard/FlightCard';

type FlightListProps = {
  flights: Flight[];
};

export const FlightList: FunctionComponent<FlightListProps> = ({ flights }) => {
  const isFlightListEmpty = flights.length === 0;

  return isFlightListEmpty ? (
    <p>Theres no flights available at this moment</p>
  ) : (
    <ul>
      {flights.map((flight) => (
        <FlightCard flight={flight} key={flight.getIdent()} />
      ))}
    </ul>
  );
};
