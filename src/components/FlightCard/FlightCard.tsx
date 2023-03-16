import React, { FunctionComponent } from 'react';
import { Card } from 'antd';
import { IFlight } from '@/models/flight';

type FlightCardProps = {
  flight: IFlight;
  onClick?: (flight: IFlight) => void;
};

export const FlightCard: FunctionComponent<FlightCardProps> = ({
  flight,
  onClick,
}) => {
  return (
    <Card
      style={{ width: 300 }}
      onClick={() => onClick(flight)}
      data-testid="flight-card-element"
      className="mt-4"
    >
      <p className="text-center font-bold">{flight.ident}</p>
      <div className="flex justify-between">
        <span>{flight.origin}</span>
        <span>{flight.destination}</span>
      </div>
      <div className="flex justify-between">
        <span>{flight.readableDeparture}</span>
        <span>{flight.readableArrival}</span>
      </div>
    </Card>
  );
};
