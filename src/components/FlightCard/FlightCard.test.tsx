import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { FlightCard } from './FlightCard';
import { IFlight } from '../../interfaces/flight';

describe('tests the FlightCard component', () => {
  it('should show flight informations', () => {
    render(
      <FlightCard
        flight={
          new Flight('AS1001', 21500, 26100, '6:00', '7:15', 'LFSB', 'LFMN')
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
          new Flight('AS1001', 21500, 26100, '6:00', '7:15', 'LFSB', 'LFMN')
        }
        onClick={onClick}
      />
    );

    await user.click(screen.getByTestId('flight-card-element'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
