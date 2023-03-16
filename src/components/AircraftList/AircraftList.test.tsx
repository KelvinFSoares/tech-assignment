import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AircraftList } from './AircraftList';
import { IAircraft } from '../../models/aircraft';

describe('tests the AircraftList component', () => {
  it('should show empty message if no aircrafts were fetched', () => {
    render(<AircraftList aircrafts={[]} />);
    expect(
      screen.getByText('Theres no aircrafts available at this moment')
    ).toBeInTheDocument();
  });

  it('should show all aircrafts', () => {
    const aircrafts = [
      {
        ident: 'AS1001',
        type: 'A320',
        economySeats: 120,
        base: 'CPV',
      } as IAircraft,
      {
        ident: 'AS1002',
        type: 'A380',
        economySeats: 320,
        base: 'JPA',
      } as IAircraft,
    ];
    render(<AircraftList aircrafts={aircrafts} />);

    aircrafts.map((aircraft) => {
      expect(screen.getByText(aircraft.ident)).toBeInTheDocument();
    });
  });
});
