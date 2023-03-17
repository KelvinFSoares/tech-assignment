import { IAircraft } from '@/models/aircraft';
import { IFlight } from '@/models/flight';
import { canFlightsBeGrouped } from '@/utils/aircraftRotationUtils';
import {
  addElementAt,
  getFirstElement,
  getLastElement,
  isEmpty,
} from '@/utils/utils';

import { useState } from 'react';

type AircraftRotation = {
  selectedAircraft: IAircraft;
  availableFlights: IFlight[];
  setSelectedAircraft: (aircraft: IAircraft) => void;
  setAvailableFlights: (flights: IFlight[]) => void;
  rotation: IFlight[];
  addFlightToRotation: (flight: IFlight) => void;
  removeFlightFromRotation: (flight: IFlight) => void;
};

export const useAircraftRotation = (): AircraftRotation => {
  const [selectedAircraft, setSelectedAircraft] = useState<IAircraft>(
    {} as IAircraft
  );
  const [availableFlights, setAvailableFlights] = useState<IFlight[]>([]);
  const [rotation, setRotation] = useState<IFlight[]>([]);

  return {
    selectedAircraft: selectedAircraft,
    setSelectedAircraft: (aircraft: IAircraft) => {
      return setSelectedAircraft(aircraft);
    },
    availableFlights: availableFlights,
    setAvailableFlights: (flights: IFlight[]) => {
      return setAvailableFlights(flights);
    },
    rotation: rotation,
    addFlightToRotation: (flight: IFlight) => {
      let added = false;
      if (isEmpty(rotation)) {
        setRotation([...rotation, flight]);
        added = true;
      } else {
        const firstRotationFlight = getFirstElement(rotation);
        const lastRotationFlight = getLastElement(rotation);

        if (canFlightsBeGrouped(flight, firstRotationFlight)) {
          setRotation([flight, ...rotation]);
          added = true;
        }
        if (canFlightsBeGrouped(lastRotationFlight, flight)) {
          setRotation([...rotation, flight]);
          added = true;
        }
      }
      if (added)
        setAvailableFlights([
          ...availableFlights.filter((item) => item.ident !== flight.ident),
        ]);
    },
    removeFlightFromRotation: (flight: IFlight) => {
      if (flight.ident === rotation[rotation.length - 1].ident) {
        setRotation([...rotation.slice(0, -1)]);
        setAvailableFlights([...availableFlights, flight]);
      } else {
        console.log('You can remove only the last element');
      }
      return;
    },
  };
};
