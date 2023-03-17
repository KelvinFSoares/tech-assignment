import { IAircraft } from '@/models/aircraft';
import { IFlight } from '@/models/flight';

export const transformFlight = (rawFlightObject): IFlight => {
  return {
    ident: rawFlightObject.ident,
    departureTime: rawFlightObject.departuretime,
    arrivalTime: rawFlightObject.arrivaltime,
    readableDeparture: rawFlightObject.readable_departure,
    readableArrival: rawFlightObject.readable_arrival,
    origin: rawFlightObject.origin,
    destination: rawFlightObject.destination,
  } as IFlight;
};

export const transformAircraft = (rawAircraftObject): IAircraft => {
  return {
    ident: rawAircraftObject.ident,
    type: rawAircraftObject.type,
    economySeats: rawAircraftObject.economySeats,
    base: rawAircraftObject.base,
  } as IAircraft;
};
