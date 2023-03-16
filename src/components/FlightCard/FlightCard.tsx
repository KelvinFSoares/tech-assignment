import React, { FunctionComponent } from 'react';
import { Card } from 'antd';
import { Flight } from '@/models/flight';

type FlightCardProps = {
  flight: Flight;
  onClick?: () => {};
};

export const FlightCard: FunctionComponent<FlightCardProps> = ({
  flight,
  onClick,
}) => {
  return (
    <Card
      style={{ width: 300 }}
      onClick={onClick}
      data-testid="flight-card-element"
      className="mt-4"
    >
      <p className="text-center font-bold">{flight.getIdent()}</p>
      <div className="flex justify-between">
        <span>{flight.getOrigin()}</span>
        <span>{flight.getDestination()}</span>
      </div>
      <div className="flex justify-between">
        <span>{flight.getReadableDeparture()}</span>
        <span>{flight.getReadableArrival()}</span>
      </div>
    </Card>
  );
};
