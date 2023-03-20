import React, { FunctionComponent } from 'react'
import { Card } from 'antd'
import { IFlight } from '@/models/flight'

type FlightCardProps = {
  flight: IFlight
  onClick?: (flight: IFlight) => void
}

export const FlightCard: FunctionComponent<FlightCardProps> = ({
  flight,
  onClick,
  ...restProps
}) => {
  return (
    <Card
      title={`Flight: ${flight.ident}`}
      bordered={false}
      onClick={() => onClick(flight)}
      className="mt-4 cursor-pointer w-100"
      style={{ width: 250 }}
      {...restProps}
    >
      <div className="flex justify-between">
        <span>{flight.origin}</span>
        <span>{flight.destination}</span>
      </div>
      <img className="w-8 mx-auto" src="src/assets/images/right-arrow.png" />
      <div className="flex justify-between">
        <span>{flight.readableDeparture}</span>
        <span>{flight.readableArrival}</span>
      </div>
    </Card>
  )
}
