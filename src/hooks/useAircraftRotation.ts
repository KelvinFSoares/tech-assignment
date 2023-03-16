import { IAircraft } from '@/models/aircraft';
import { IFlight } from '@/models/flight';
import { useState } from 'react';

type AircraftRotation = {
  selectedAircraft: IAircraft;
  setSelectedAircraft: (aircraft: IAircraft) => void;
  rotation: IFlight[];
  addFlightToRotation: (flight: IFlight) => boolean;
};

export const useAircraftRotation = (): AircraftRotation => {
  const [selectedAircraft, setSelectedAircraft] = useState<IAircraft>(
    {} as IAircraft
  );
  const [rotation, setRotation] = useState<IFlight[]>([]);

  return {
    selectedAircraft: selectedAircraft,
    setSelectedAircraft: (aircraft: IAircraft) => {
      return setSelectedAircraft(aircraft);
    },
    rotation: rotation,
    addFlightToRotation: (flight: IFlight) => {
      setRotation([...rotation, flight]);
      return true;
    },
  };
};
