import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AircraftCard } from './AircraftCard';
import { Aircraft } from '../../models/aircraft';

describe('tests the AircraftCard component', () => {
  it('should show aircraft ident letters', () => {
    render(
      <AircraftCard aircraft={new Aircraft('AS1001', 'A320', 100, 'EGKK')} />
    );
    expect(screen.getByText('AS1001')).toBeInTheDocument();
  });

  // it('should show aircraft busy time percentage number', () => {
  // });

  it('should trigger on click function when user clicks on it', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <AircraftCard
        aircraft={new Aircraft('AS1001', 'A320', 100, 'EGKK')}
        onClick={onClick}
      />
    );

    await user.click(screen.getByTestId('aircraft-card-element'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
