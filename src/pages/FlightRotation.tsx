import { AircraftList } from '@/components/AircraftList/AircraftList';
import { AircraftRotationList } from '@/components/AircraftRotationList/AircraftRotationList';
import { FlightList } from '@/components/FlightList/FlightList';
import { useAircraftRotation } from '@/hooks/useAircraftRotation';
import { IAircraft } from '@/models/aircraft';
import { IFlight } from '@/models/flight';
import Axios from 'axios';
import { useQueries } from 'react-query';

export const FlightRotation = () => {
  const {
    selectedAircraft,
    rotation,
    setSelectedAircraft,
    addFlightToRotation,
  } = useAircraftRotation();
  const [aircraftQuery, flightQuery] = useQueries([
    {
      queryKey: ['aircraft', 1],
      queryFn: () =>
        Axios.get(
          'https://recruiting-assessment.alphasights.com/api/aircrafts'
        ).then((res) => res.data),
    },

    {
      queryKey: ['flight', 2],
      queryFn: () =>
        Axios.get(
          'https://recruiting-assessment.alphasights.com/api/flights'
        ).then((res) => res.data),
    },
  ]);

  let aircraftData;
  let flightsData;

  if (aircraftQuery.data && flightQuery.data) {
    aircraftData = aircraftQuery.data.map((aircraftRawData) => {
      return {
        ident: aircraftRawData.ident,
        type: aircraftRawData.type,
        economySeats: aircraftRawData.economySeats,
        base: aircraftRawData.base,
      } as IAircraft;
    });

    flightsData = flightQuery.data.map((rawFlight) => {
      return {
        ident: rawFlight.ident,
        departureTime: rawFlight.departure_time,
        arrivalTime: rawFlight.arrivaltime,
        readableDeparture: rawFlight.readable_departure,
        readableArrival: rawFlight.readable_arrival,
        origin: rawFlight.origin,
        destination: rawFlight.destination,
      } as IFlight;
    });
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen space-y-5 bg-dark-purple">
      <p className="text-center text-linen mt-48 mb-8">
        Rotation of: {selectedAircraft.ident}
      </p>
      <div className="container mx-auto grid grid-cols-3 gap-4">
        <div className="border">
          <AircraftList
            aircrafts={aircraftData}
            onItemClick={setSelectedAircraft}
          />
        </div>
        <div className="border">
          <AircraftRotationList
            flights={rotation}
            onItemClick={(flight: IFlight) => console.log(flight.ident)}
          />
        </div>
        <div className="border">
          <FlightList flights={flightsData} onItemClick={addFlightToRotation} />
        </div>
      </div>
    </div>
  );
};
