import React, { FunctionComponent } from 'react';
import { Card } from 'antd';
import { IAircraft } from '@/models/aircraft';

type AircraftCardProps = {
  aircraft: IAircraft;
  onClick?: (aircraft: IAircraft) => void;
};

export const AircraftCard: FunctionComponent<AircraftCardProps> = ({
  aircraft,
  onClick,
}) => {
  return (
    <Card
      style={{ minWidth: 200 }}
      onClick={() => onClick(aircraft)}
      data-testid="aircraft-card-element"
      className="mt-4 cursor-pointer"
    >
      <p className="text-center font-bold">{aircraft.ident}</p>
    </Card>
  );
};
