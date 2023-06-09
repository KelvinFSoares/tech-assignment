import { IFlight } from '@/models/flight'
import { isNumberInRangeOf } from './utils'

export const turnAroundRequiredTimeSecs = 1200

// FLIGHT UTILS
export const isFlightThroughMidnight = (flight: IFlight): boolean => {
  return flight.departureTime > flight.arrivalTime
}

export const sortFlightList = (flightList: IFlight[]): IFlight[] => {
  return flightList.sort(
    (flightA, flightB) => flightA.departureTime - flightB.departureTime,
  )
}

export const areFlightsTimesNotOverlapping = (
  flightA: IFlight,
  flightB: IFlight,
): boolean => {
  return !isNumberInRangeOf(
    flightA.departureTime,
    flightB.departureTime,
    flightB.arrivalTime,
  )
}

export const areFlightsRespectingTimeline = (
  flightA: IFlight,
  flightB: IFlight,
): boolean => {
  return flightB.departureTime - flightA.arrivalTime > 0
}

export const areFlightsRespectingTurnaround = (
  flightA: IFlight,
  flightB: IFlight,
): boolean => {
  return (
    Math.abs(flightB.departureTime - flightA.arrivalTime) >
    turnAroundRequiredTimeSecs
  )
}

export const areFlightsLocationConnected = (
  flightA: IFlight,
  flightB: IFlight,
): boolean => {
  return flightA.destination === flightB.origin
}
