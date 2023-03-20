import { v4 as uuidv4 } from 'uuid'
import { IFlight } from '@/models/flight'
import { ITimelineItem, timelineItemType } from '@/models/timelineitem'
import { turnAroundRequiredTimeSecs } from '@/utils/flightUtils'
import { durationDayInSeconds, getPercentageWidth } from '@/utils/utils'
import { useEffect, useState } from 'react'
import { IAircraft } from '@/models/aircraft'

interface AircraftTimelineProps {
  selectedAircraft: IAircraft
  rotationData: IFlight[]
}

export const timelineColors = {
  idleColor: '#D3D3D3',
  scheduledColor: '#96be25',
  turnaroundColor: '#be2596',
}

const AircraftTimeline = ({
  selectedAircraft,
  rotationData,
}: AircraftTimelineProps) => {
  const getColor = (type: timelineItemType) => {
    switch (type) {
      case timelineItemType.IDLE:
        return timelineColors.idleColor
      case timelineItemType.SCHEDULED:
        return timelineColors.scheduledColor
      case timelineItemType.TURNAROUND:
        return timelineColors.turnaroundColor
      default:
        return timelineColors.idleColor
    }
  }

  const [timelineItems, setTimelineItems] = useState<ITimelineItem[]>([])

  useEffect(() => {
    setTimelineItems([])
    rotationData.map((flight, index) => {
      //first flight
      if (index === 0) {
        setTimelineItems((previousInput) => [
          ...previousInput,
          {
            width: getPercentageWidth(flight.departureTime),
            type: timelineItemType.IDLE,
          } as ITimelineItem,
        ])
      }

      ///add flight time
      setTimelineItems((previousInput) => [
        ...previousInput,
        {
          width: getPercentageWidth(flight.arrivalTime - flight.departureTime),
          type: timelineItemType.SCHEDULED,
        } as ITimelineItem,
      ])

      // not last flight add turnaround and idle time until next flight
      if (index !== rotationData.length - 1) {
        setTimelineItems((previousInput) => [
          ...previousInput,
          {
            width: getPercentageWidth(turnAroundRequiredTimeSecs),
            type: timelineItemType.TURNAROUND,
          } as ITimelineItem,
        ])
        setTimelineItems((previousInput) => [
          ...previousInput,
          {
            width: getPercentageWidth(
              rotationData[index + 1].departureTime -
                flight.arrivalTime -
                turnAroundRequiredTimeSecs,
            ),
            type: timelineItemType.IDLE,
          } as ITimelineItem,
        ])
      } else {
        //last flight add idle end time
        setTimelineItems((previousInput) => [
          ...previousInput,
          {
            width: getPercentageWidth(
              durationDayInSeconds - flight.arrivalTime,
            ),
            type: timelineItemType.IDLE,
          } as ITimelineItem,
        ])
      }
    })
  }, [rotationData])

  const getScheduledTotalTime = () => {
    return timelineItems
      .filter((item) => item.type === timelineItemType.SCHEDULED)
      .reduce((prev, curr) => prev + curr.width, 0)
  }

  return (
    <div className="bg-dark-purple mt-4 p-4">
      <div className="text-linen">
        <p className="text-lg">{`Scheduled timeline of: ${selectedAircraft.ident}`}</p>
        <p className="text-md">
          Total scheduled:{' '}
          <span className="text-lg">{getScheduledTotalTime()}%</span>
        </p>
      </div>
      <div className="flex justify-between text-linen">
        <div>0:00</div>
        <div>6:00</div>
        <div>12:00</div>
        <div>18:00</div>
        <div>23:59</div>
      </div>
      <hr />
      <div className="flex w-100 border h-12">
        {timelineItems.length === 0 ? (
          <div
            data-testid="timeline-item-0"
            className="w-100"
            style={{
              width: '100%',
              backgroundColor: timelineColors.idleColor,
            }}
          />
        ) : (
          timelineItems.map((item, index) => (
            <div
              data-testid={`timeline-item-${index}`}
              style={{
                width: item.width + '%',
                backgroundColor: getColor(item.type),
              }}
              key={`timelineItem-${uuidv4()}`}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default AircraftTimeline
