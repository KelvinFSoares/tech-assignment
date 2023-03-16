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
      new Flight('AS1001', 21500, 26100, '6:00', '7:15', 'LFSB', 'LFMN'),
      new Flight('AS1002', 27900, 32100, '7:45', '08:55', 'LFMN', 'LFSB'),
    ];
    render(<FlightList flights={flights} />);

    flights.map((flight) => {
      expect(screen.getByText(flight.getIdent())).toBeInTheDocument();
      expect(
        screen.getByText(flight.getReadableDeparture())
      ).toBeInTheDocument();
      expect(screen.getByText(flight.getReadableArrival())).toBeInTheDocument();
    });
  });
});
