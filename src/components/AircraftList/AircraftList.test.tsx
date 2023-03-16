import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AircraftList } from './AircraftList';
import { Aircraft } from '../../models/aircraft';

describe('tests the AircraftList component', () => {
  it('should show empty message if no aircrafts were fetched', () => {
    render(<AircraftList aircrafts={[]} />);
    expect(
      screen.getByText('Theres no aircrafts available at this moment')
    ).toBeInTheDocument();
  });

  it('should show all aircrafts', () => {
    const aircrafts = [
      new Aircraft('AS1001', 'A320', 120, 'CPV'),
      new Aircraft('AS1002', 'A380', 320, 'JPA'),
    ];
    render(<AircraftList aircrafts={aircrafts} />);

    aircrafts.map((aircraft) => {
      expect(screen.getByText(aircraft.getIdent())).toBeInTheDocument();
    });
  });
});
