export interface IFlight {
  ident: string;
  departureTime: number;
  arrivalTime: number;
  readableDeparture: string;
  readableArrival: string;
  origin: string;
  destination: string;
}
