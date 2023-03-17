import { IFlight } from '@/models/flight';
import { isNumberInRangeOf } from './utils';

// FLIGHT UTILS
export const isFlightThroughMidnight = (flight: IFlight): boolean => {
  return flight.departureTime > flight.arrivalTime;
};

export const areFlightsNotThroughMidnight = (
  flightA: IFlight,
  flightB: IFlight
): boolean => {
  return !isFlightThroughMidnight(flightA) && !isFlightThroughMidnight(flightB);
};

export const areFlightsTimesNotOverlapping = (
  flightA: IFlight,
  flightB: IFlight
): boolean => {
  return !isNumberInRangeOf(
    flightA.departureTime,
    flightB.departureTime,
    flightB.arrivalTime
  );
};

export const areFlightsRespectingTimeline = (
  flightA: IFlight,
  flightB: IFlight
): boolean => {
  return flightB.departureTime - flightA.arrivalTime > 0;
};

export const areFlightsRespectingTurnaround = (
  flightA: IFlight,
  flightB: IFlight,
  turnAroundTimeSecs: number
): boolean => {
  return (
    Math.abs(flightB.departureTime - flightA.arrivalTime) > turnAroundTimeSecs
  );
};

export const areFlightsLocationConnected = (
  flightA: IFlight,
  flightB: IFlight
): boolean => {
  return flightA.destination === flightB.origin;
};
