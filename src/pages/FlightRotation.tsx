import { AircraftList } from '@/components/AircraftList/AircraftList';
import { AircraftRotationList } from '@/components/AircraftRotationList/AircraftRotationList';
import { FlightList } from '@/components/FlightList/FlightList';
import { useAircraftRotation } from '@/hooks/useAircraftRotation';
import { IAircraft } from '@/models/aircraft';
import { IFlight } from '@/models/flight';
import { transformAircraft, transformFlight } from '@/utils/transformers';
import Axios from 'axios';
import { useQueries } from 'react-query';

export const FlightRotation = () => {
  const {
    selectedAircraft,
    rotation,
    setSelectedAircraft,
    addFlightToRotation,
    removeFlightFromRotation,
  } = useAircraftRotation();

  const [aircraftQuery, flightQuery] = useQueries([
    {
      queryKey: ['aircraft', 1],
      queryFn: () =>
        Axios.get(
          'https://recruiting-assessment.alphasights.com/api/aircrafts'
        ).then((res) => res.data.map(transformAircraft)),
    },
    {
      queryKey: ['flight', 2],
      queryFn: () =>
        Axios.get(
          'https://recruiting-assessment.alphasights.com/api/flights'
        ).then((res) => res.data.map(transformFlight)),
    },
  ]);

  return (
    <div className="flex justify-center items-center flex-col h-screen space-y-5 bg-dark-purple">
      <p className="text-center text-linen mt-48 mb-8">
        Rotation of: {selectedAircraft.ident}
      </p>
      <div className="container mx-auto grid grid-cols-3 gap-4">
        <div className="border">
          <AircraftList
            aircrafts={aircraftQuery.data}
            onItemClick={setSelectedAircraft}
          />
        </div>
        <div className="border">
          <AircraftRotationList
            flights={rotation}
            onItemClick={removeFlightFromRotation}
          />
        </div>
        <div className="border">
          <FlightList
            flights={flightQuery.data}
            onItemClick={addFlightToRotation}
          />
        </div>
      </div>
    </div>
  );
};
