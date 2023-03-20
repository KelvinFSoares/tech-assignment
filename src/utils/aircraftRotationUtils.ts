import { IFlight } from '@/models/flight'
import {
  areFlightsLocationConnected,
  areFlightsTimesNotOverlapping,
  areFlightsRespectingTimeline,
  areFlightsRespectingTurnaround,
} from './flightUtils'

export const canFlightsBeGrouped = (
  flightA: IFlight,
  flightB: IFlight,
): boolean => {
  if (
    areFlightsLocationConnected(flightA, flightB) &&
    areFlightsTimesNotOverlapping(flightA, flightB) &&
    areFlightsRespectingTimeline(flightA, flightB) &&
    areFlightsRespectingTurnaround(flightA, flightB)
  ) {
    return true
  }
  return false
}
