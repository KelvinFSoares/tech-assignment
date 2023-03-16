import React, { FunctionComponent } from 'react';
import { Card } from 'antd';
import { Aircraft } from '@/models/aircraft';

type AircraftCardProps = {
  aircraft: Aircraft;
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
      <p className="text-center font-bold">{aircraft.getIdent()}</p>
    </Card>
  );
};
