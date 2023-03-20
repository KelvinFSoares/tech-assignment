import React, { FunctionComponent } from 'react'
import { Card } from 'antd'
import { IAircraft } from '@/models/aircraft'

type AircraftCardProps = {
  aircraft: IAircraft
  onClick?: (aircraft: IAircraft) => void
}

export const AircraftCard: FunctionComponent<AircraftCardProps> = ({
  aircraft,
  onClick,
}) => {
  return (
    <Card
      title={`Aircraft`}
      bordered={false}
      style={{ minWidth: 250 }}
      onClick={() => onClick(aircraft)}
      data-testid="aircraft-card-element"
      className="mt-4 cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center">
        <p className="text-center font-bold">{aircraft.ident}</p>
        <img className="w-12" src="src/assets/images/black-plane.png" />
      </div>
    </Card>
  )
}
