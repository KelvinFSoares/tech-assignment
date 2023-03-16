import React, { FunctionComponent } from 'react';
import { Card } from 'antd';
import { IAircraft } from '@/interfaces/aircraft';

type AircraftCardProps = {
  aircraft: IAircraft;
  onClick?: () => {};
};

export const AircraftCard: FunctionComponent<AircraftCardProps> = ({
  aircraft,
  onClick,
}) => {
  return (
    <Card
      style={{ width: 300 }}
      onClick={onClick}
      data-testid="aircraft-card-element"
      className="mt-4"
    >
      <p className="text-center font-bold">{aircraft.ident}</p>
    </Card>
  );
};
