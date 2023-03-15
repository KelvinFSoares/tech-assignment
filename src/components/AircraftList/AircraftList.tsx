import React, { FunctionComponent } from 'react';
import { Aircraft } from '@/models/aircraft';
import { AircraftCard } from '../AircraftCard/AircraftCard';

type AircraftListProps = {
  aircrafts: Aircraft[];
};

export const AircraftList: FunctionComponent<AircraftListProps> = ({
  aircrafts,
}) => {
  const isAircraftListEmpty = aircrafts.length === 0;

  return isAircraftListEmpty ? (
    <p>Theres no aircrafts available at this moment</p>
  ) : (
    <ul>
      {aircrafts.map((aircraft) => (
        <AircraftCard aircraft={aircraft} key={aircraft.getIdent()} />
      ))}
    </ul>
  );
};
