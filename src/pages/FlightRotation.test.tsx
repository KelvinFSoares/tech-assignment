import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { FlightRotation } from './FlightRotation';

describe('Should render FlightRotation page without issues', () => {
  it('Renders hello world', () => {
    // ARRANGE
    render(<FlightRotation />);
    // ACT
    expect(screen.getByText('Rotation of')).toBeInTheDocument;
    // EXPECT
  });
});
