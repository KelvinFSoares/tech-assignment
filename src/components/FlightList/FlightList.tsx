import React, { FunctionComponent } from 'react'
import { IFlight } from '@/models/flight'
import { FlightCard } from '../FlightCard/FlightCard'
import { List } from 'antd'

type FlightListProps = {
  flights: IFlight[]
  onItemClick: (flight: IFlight) => void
}

export const FlightList: FunctionComponent<FlightListProps> = ({
  flights,
  onItemClick,
}) => {
  const isFlightListEmpty = flights?.length === 0

  return !flights || isFlightListEmpty ? (
    <p>Theres no flights available at this moment</p>
  ) : (
    <List
      pagination={{
        showSizeChanger: false,
        pageSize: 6,
      }}
      grid={{ gutter: 16, column: 2 }}
      dataSource={flights}
      className="mb-4 mr-4 p-4"
      renderItem={(flight, index) => (
        <div className="flex align-center justify-center">
          <FlightCard
            flight={flight}
            key={flight.ident}
            onClick={onItemClick}
            data-testid={`flight-card-element-${index}`}
          />
        </div>
      )}
    />
  )
}
