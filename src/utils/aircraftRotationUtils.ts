import { IFlight } from '@/models/flight';
import {
  areFlightsLocationConnected,
  areFlightsTimesNotOverlapping,
  areFlightsRespectingTimeline,
  areFlightsRespectingTurnaround,
  isFlightThroughMidnight,
} from './flightUtils';
import {
  isEmpty,
  addElementAt,
  getFirstElement,
  getLastElement,
} from './utils';

const turnAroundRequiredTimeSecs = 1200;

const canFlightsBeGrouped = (flightA: IFlight, flightB: IFlight): boolean => {
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

export const addFlightToRotationList = (
  newFlight: IFlight,
  rotationList: IFlight[]
) => {
  if (isFlightThroughMidnight(newFlight)) return rotationList;
  if (isEmpty(rotationList)) {
    return [...rotationList, newFlight];
  } else {
    const firstRotationFlight = getFirstElement(rotationList);
    const lastRotationFlight = getLastElement(rotationList);

    if (canFlightsBeGrouped(newFlight, firstRotationFlight)) {
      return addElementAt(0, newFlight, rotationList);
    }
    if (canFlightsBeGrouped(lastRotationFlight, newFlight)) {
      return addElementAt(rotationList.length, newFlight, rotationList);
    }
  }
  return rotationList;
};
