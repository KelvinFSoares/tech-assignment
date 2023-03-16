export class Flight {
  private ident: string;
  private departureTime: number;
  private arrivalTime: number;
  private readableDeparture: string;
  private readableArrival: string;
  private origin: string;
  private destination: string;

  constructor(
    ident: string,
    departureTime: number,
    arrivalTime: number,
    readableDeparture: string,
    readableArrival: string,
    origin: string,
    destination: string
  ) {
    this.ident = ident;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.readableDeparture = readableDeparture;
    this.readableArrival = readableArrival;
    this.origin = origin;
    this.destination = destination;
  }

  getIdent(): string {
    return this.ident;
  }

  getDepartureTime(): number {
    return this.departureTime;
  }

  getArrivalTime(): number {
    return this.arrivalTime;
  }

  getReadableDeparture(): string {
    return this.readableDeparture;
  }

  getReadableArrival(): string {
    return this.readableArrival;
  }

  getOrigin(): string {
    return this.origin;
  }

  getDestination(): string {
    return this.destination;
  }
}
