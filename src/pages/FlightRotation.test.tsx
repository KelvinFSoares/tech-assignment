import { describe, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { FlightRotation } from './FlightRotation'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import userEvent from '@testing-library/user-event'
import { renderWithClient } from '@/utils/testUtils'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('Should render FlightRotation page without issues', () => {
  it('should render aircraft, rotation and flights columns when an aircraft is selected', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <FlightRotation />
      </QueryClientProvider>,
    )
    expect(screen.getByText('Aircrafts')).toBeInTheDocument
    expect(
      screen.getByText(
        'Select one flight from the flighs available to start the rotation',
      ),
    ).toBeInTheDocument
    expect(screen.getByText('Flights')).toBeInTheDocument
  })
})

describe('Should render the rotation list properly', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn(() => {
        return {
          matches: true,
          addListener: vi.fn(),
          removeListener: vi.fn(),
        }
      }),
    })
  })

  it('should render a flight card in rotation list after user clicks on a flight available', async () => {
    const result = renderWithClient(<FlightRotation />)
    const user = userEvent.setup()

    const firstFlightAvailable = await result.findByTestId(
      'flight-card-element-0',
    )
    if (firstFlightAvailable) {
      await user.click(screen.getByTestId('flight-card-element-0'))
      expect(result.getByTestId('rotation-card-element-0')).toBeInTheDocument()
    }
  })

  it('should remove flight card from rotation list when user clicks on it', async () => {
    const result = renderWithClient(<FlightRotation />)
    const user = userEvent.setup()

    const firstFlightAvailable = await result.findByTestId(
      'flight-card-element-0',
    )
    if (firstFlightAvailable) {
      await user.click(screen.getByTestId('flight-card-element-0'))
      await user.click(screen.getByTestId('rotation-card-element-0'))
      expect(
        await result.queryByTestId('rotation-card-element-0'),
      ).not.toBeInTheDocument()
    }
  })
})
