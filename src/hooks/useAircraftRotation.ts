import { IAircraft } from '@/models/aircraft';
import { IFlight } from '@/models/flight';
import { addFlightToRotationList } from '@/utils/aircraftRotationUtils';
import { useState } from 'react';

type AircraftRotation = {
  selectedAircraft: IAircraft;
  setSelectedAircraft: (aircraft: IAircraft) => void;
  rotation: IFlight[];
  addFlightToRotation: (flight: IFlight) => void;
  removeFlightFromRotation: (flight: IFlight) => void;
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
      setRotation([...addFlightToRotationList(flight, rotation)]);
    },
    removeFlightFromRotation: (flight: IFlight) => {
      // check if the last flight, if so remove it
      if (flight.ident === rotation[rotation.length - 1].ident) {
        setRotation([...rotation.slice(0, -1)]);
      } else {
        console.log('You can remove only the last element');
      }
      return;
    },
  };
};
