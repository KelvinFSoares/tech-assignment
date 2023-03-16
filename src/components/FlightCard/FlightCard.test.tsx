import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { FlightCard } from './FlightCard';
import { IFlight } from '../../models/flight';

describe('tests the FlightCard component', () => {
  it('should show flight informations', () => {
    render(
      <FlightCard
        flight={
          {
            ident: 'AS1001',
            departureTime: 21500,
            arrivalTime: 26100,
            readableDeparture: '6:00',
            readableArrival: '7:15',
            origin: 'LFSB',
            destination: 'LFMN',
          } as IFlight
        }
      />
    );
    expect(screen.getByText('AS1001')).toBeInTheDocument();
    expect(screen.getByText('6:00')).toBeInTheDocument();
    expect(screen.getByText('7:15')).toBeInTheDocument();
    expect(screen.getByText('LFSB')).toBeInTheDocument();
    expect(screen.getByText('LFMN')).toBeInTheDocument();
  });

  it('should trigger on click function when user clicks on it', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <FlightCard
        flight={
          {
            ident: 'AS1001',
            departureTime: 21500,
            arrivalTime: 26100,
            readableDeparture: '6:00',
            readableArrival: '7:15',
            origin: 'LFSB',
            destination: 'LFMN',
          } as IFlight
        }
        onClick={onClick}
      />
    );

    await user.click(screen.getByTestId('flight-card-element'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
