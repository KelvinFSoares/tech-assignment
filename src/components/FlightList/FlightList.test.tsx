import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { FlightList } from './FlightList';
import { IFlight } from '../../interfaces/flight';

describe('tests the FlightList component', () => {
  it('should show empty message if no flights were available', () => {
    render(<FlightList flights={[]} />);
    expect(
      screen.getByText('Theres no flights available at this moment')
    ).toBeInTheDocument();
  });

  it('should show all flights', () => {
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
      {
        ident: 'AS1002',
        departureTime: 27900,
        arrivalTime: 32100,
        readableDeparture: '7:45',
        readableArrival: '08:55',
        origin: 'CPV',
        destination: 'JPA',
      } as IFlight,
    ];
    render(<FlightList flights={flights} />);

    flights.map((flight) => {
      expect(screen.getByText(flight.ident)).toBeInTheDocument();
      expect(screen.getByText(flight.readableDeparture)).toBeInTheDocument();
      expect(screen.getByText(flight.readableArrival)).toBeInTheDocument();
      expect(screen.getByText(flight.origin)).toBeInTheDocument();
      expect(screen.getByText(flight.destination)).toBeInTheDocument();
    });
  });
});
