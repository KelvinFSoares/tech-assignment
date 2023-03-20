export enum timelineItemType {
  IDLE = 'idle',
  SCHEDULED = 'scheduled',
  TURNAROUND = 'turnaround',
}

export interface ITimelineItem {
  width: number
  type: timelineItemType
}
