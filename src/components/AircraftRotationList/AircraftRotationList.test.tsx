import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { AircraftRotationList } from './AircraftRotationList'
import { IFlight } from '@/models/flight'

describe('tests the AircraftRotationList component', () => {
  it('should show empty message if no flights were selected yet', () => {
    render(<AircraftRotationList flights={[]} onItemClick={() => {}} />)
    expect(
      screen.getByText(
        'Select one flight from the flighs available to start the rotation',
      ),
    ).toBeInTheDocument()
  })

  it('should show all flights added to the rotation', () => {
    const flights = [
      {
        ident: 'AS1001',
        departureTime: 21500,
        arrivalTime: 26100,
        readableDeparture: '6:00',
        readableArrival: '7:15',
        origin: 'LFSB',
        destination: 'LFMN',
      } as IFlight,
    ]
    render(<AircraftRotationList flights={flights} onItemClick={() => {}} />)

    flights.map((flight) => {
      expect(screen.getByText(`Flight: ${flight.ident}`)).toBeInTheDocument()
      expect(screen.getByText(flight.readableDeparture)).toBeInTheDocument()
      expect(screen.getByText(flight.readableArrival)).toBeInTheDocument()
      expect(screen.getByText(flight.origin)).toBeInTheDocument()
      expect(screen.getByText(flight.destination)).toBeInTheDocument()
    })
  })
})
