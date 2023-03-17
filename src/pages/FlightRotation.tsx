import { fetchAircrafts, fetchFlights } from '@/Api';
import { AircraftList } from '@/components/AircraftList/AircraftList';
import { AircraftRotationList } from '@/components/AircraftRotationList/AircraftRotationList';
import { FlightList } from '@/components/FlightList/FlightList';
import { useAircraftRotation } from '@/hooks/useAircraftRotation';
import { transformAircraft, transformFlight } from '@/utils/transformers';
import { Space } from 'antd';
import { useEffect } from 'react';
import { useQueries } from 'react-query';

export const FlightRotation = () => {
  const {
    selectedAircraft,
    availableFlights,
    rotation,
    setSelectedAircraft,
    setAvailableFlights,
    addFlightToRotation,
    removeFlightFromRotation,
  } = useAircraftRotation();

  const [aircraftQuery, flightQuery] = useQueries([
    {
      queryKey: ['aircraft', 1],
      queryFn: () =>
        fetchAircrafts().then((res) =>
          res.data ? res.data.map(transformAircraft) : []
        ),
    },
    {
      queryKey: ['flight', 1],
      queryFn: () =>
        fetchFlights().then((res) =>
          setAvailableFlights(res.data ? res.data.map(transformFlight) : [])
        ),
    },
  ]);

  useEffect(() => {
    return () => {
      setSelectedAircraft(
        aircraftQuery.data && aircraftQuery.data.length > 0
          ? aircraftQuery.data[0]
          : {}
      );
    };
  }, [aircraftQuery.data]);

  return (
    <div className="bg-dark-purple">
      <Space direction="vertical" size={12} className="mt-52"></Space>
      <div className="container mx-auto grid grid-cols-5 gap-4">
        <div className="border">
          <h3 className="text-center text-linen mt-4 mb-8">Aircrafts</h3>
          <AircraftList
            aircrafts={aircraftQuery.data}
            onItemClick={setSelectedAircraft}
          />
        </div>
        <div className="border">
          {selectedAircraft.ident && (
            <h3 className="text-center text-linen mt-4 mb-8">
              Rotation: {selectedAircraft.ident}
            </h3>
          )}
          <AircraftRotationList
            flights={rotation}
            onItemClick={removeFlightFromRotation}
          />
        </div>
        <div className="border col-span-3">
          <h3 className="text-center text-linen mt-4 mb-8">Flights</h3>
          <FlightList
            flights={availableFlights}
            onItemClick={addFlightToRotation}
          />
        </div>
      </div>
      <div className="border w-100"></div>
    </div>
  );
};
