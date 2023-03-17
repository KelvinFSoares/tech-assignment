import { IFlight } from '@/models/flight';
import {
  areFlightsNotThroughMidnight,
  areFlightsLocationConnected,
  areFlightsTimesNotOverlapping,
  areFlightsRespectingTimeline,
  areFlightsRespectingTurnaround,
} from './flightUtils';
import { isEmpty, addElementAt } from './utils';

const turnAroundRequiredTimeSecs = 1200;

const canFlightsBeGrouped = (flightA: IFlight, flightB: IFlight): number => {
  if (
    areFlightsNotThroughMidnight(flightA, flightB) &&
    areFlightsLocationConnected(flightA, flightB) &&
    areFlightsTimesNotOverlapping(flightA, flightB) &&
    areFlightsRespectingTimeline(flightA, flightB) &&
    areFlightsRespectingTurnaround(flightA, flightB, turnAroundRequiredTimeSecs)
  ) {
    return -1;
  }
  if (
    areFlightsNotThroughMidnight(flightB, flightA) &&
    areFlightsLocationConnected(flightB, flightA) &&
    areFlightsTimesNotOverlapping(flightB, flightA) &&
    areFlightsRespectingTimeline(flightB, flightA) &&
    areFlightsRespectingTurnaround(flightB, flightA, turnAroundRequiredTimeSecs)
  ) {
    return +1;
  }
  return 0;
};

export const addFlightToRotationList = (
  newFlight: IFlight,
  rotationList: IFlight[]
) => {
  if (isEmpty(rotationList)) {
    return [...rotationList, newFlight];
  } else {
    let comparationResult = 0;
    rotationList.map((flight, index) => {
      comparationResult = canFlightsBeGrouped(flight, newFlight);
      console.log(
        'comparation result => ',
        comparationResult,
        flight.ident,
        newFlight.ident
      );
      if (comparationResult < 0) {
        return addElementAt(index + 1, newFlight, rotationList);
      }
      if (comparationResult > 0) {
        return addElementAt(index - 1, newFlight, rotationList);
      }
    });
  }
  return rotationList;
};
