import { AircraftList } from '@/components/AircraftList/AircraftList';
import { FlightList } from '@/components/FlightList/FlightList';
import { IAircraft } from '@/interfaces/aircraft';
import { IFlight } from '@/interfaces/flight';
import Axios from 'axios';
import { useQueries } from 'react-query';

export const FlightRotation = () => {
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
      <h1 className="text-4xl font-bold text-linen text-center ">
        Hello World
      </h1>
      <div className="container mx-auto grid grid-cols-3 gap-4">
        <div className="border">
          <AircraftList aircrafts={aircraftData} />
        </div>
        <div className="border">02</div>
        <div className="border">
          <FlightList flights={flightsData} />
        </div>
      </div>
    </div>
  );
};
