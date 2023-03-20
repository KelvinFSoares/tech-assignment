import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import AircraftTimeline, { timelineColors } from './AircraftTimeline'
import { IFlight } from '@/models/flight'
import { IAircraft } from '@/models/aircraft'

describe('tests the AircraftTimeline component', () => {
  it('should show 100% idle if no flights are added into the aircraft rotation', () => {
    render(
      <AircraftTimeline
        rotationData={[]}
        selectedAircraft={
          {
            ident: 'AS1001',
            type: 'A320',
            economySeats: 120,
            base: 'CPV',
          } as IAircraft
        }
      />,
    )

    expect(screen.getByTestId('timeline-item-0')).toHaveStyle(
      `background-color: ${timelineColors.idleColor}`,
    )
    expect(screen.getByTestId('timeline-item-0')).toHaveStyle(`width: 100%`)
  })

  it('should show a SCHEDULED section of 25% of the day-time and two IDLE sections of 25% day-time before and 50% after the flight when one flight of 6 hours is placed at 6:00 am', () => {
    render(
      <AircraftTimeline
        rotationData={[
          {
            ident: 'AS1001',
            departureTime: 21500, //06:00 am
            arrivalTime: 43200, //12am
            readableDeparture: '6:00',
            readableArrival: '12:00',
            origin: 'LFSB',
            destination: 'LFMN',
          } as IFlight,
        ]}
        selectedAircraft={
          {
            ident: 'AS1001',
            type: 'A320',
            economySeats: 120,
            base: 'CPV',
          } as IAircraft
        }
      />,
    )

    expect(screen.getByTestId('timeline-item-0')).toHaveStyle(
      `background-color: ${timelineColors.idleColor}`,
    )
    expect(screen.getByTestId('timeline-item-0')).toHaveStyle(`width: 25%`)

    expect(screen.getByTestId('timeline-item-1')).toHaveStyle(
      `background-color: ${timelineColors.scheduledColor}`,
    )
    expect(screen.getByTestId('timeline-item-1')).toHaveStyle(`width: 25%`)

    expect(screen.getByTestId('timeline-item-2')).toHaveStyle(
      `background-color: ${timelineColors.idleColor}`,
    )
    expect(screen.getByTestId('timeline-item-2')).toHaveStyle(`width: 50%`)
  })

  it('should show a TURNAROUND section just after a scheduled section when the aircraft have another scheduled flight at the same airport ', () => {
    render(
      <AircraftTimeline
        rotationData={[
          {
            ident: 'AS1001',
            departureTime: 21500,
            arrivalTime: 43200,
            readableDeparture: '6:00',
            readableArrival: '12:00',
            origin: 'LFSB',
            destination: 'LFMN',
          } as IFlight,
          {
            ident: 'AS1002',
            departureTime: 45200,
            arrivalTime: 53200,
            readableDeparture: '13:00',
            readableArrival: '13:30',
            origin: 'LFMN',
            destination: 'LFSB',
          } as IFlight,
        ]}
        selectedAircraft={
          {
            ident: 'AS1001',
            type: 'A320',
            economySeats: 120,
            base: 'CPV',
          } as IAircraft
        }
      />,
    )

    expect(screen.getByTestId('timeline-item-1')).toHaveStyle(
      `background-color: ${timelineColors.scheduledColor}`,
    )

    expect(screen.getByTestId('timeline-item-2')).toHaveStyle(
      `background-color: ${timelineColors.turnaroundColor}`,
    )
  })
})
