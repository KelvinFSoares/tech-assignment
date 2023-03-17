import { IFlight } from '@/models/flight';
import {
  areFlightsLocationConnected,
  areFlightsTimesNotOverlapping,
  areFlightsRespectingTimeline,
  areFlightsRespectingTurnaround,
} from './flightUtils';

const turnAroundRequiredTimeSecs = 1200;

export const canFlightsBeGrouped = (
  flightA: IFlight,
  flightB: IFlight
): boolean => {
  if (
    areFlightsLocationConnected(flightA, flightB) &&
    areFlightsTimesNotOverlapping(flightA, flightB) &&
    areFlightsRespectingTimeline(flightA, flightB) &&
    areFlightsRespectingTurnaround(flightA, flightB, turnAroundRequiredTimeSecs)
  ) {
    return true;
  }
  return false;
};
