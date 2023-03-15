export class Aircraft {
  private ident: string;
  private type: string;
  private economySeats: number;
  private base: string;

  constructor(ident: string, type: string, economySeats: number, base: string) {
    this.ident = ident;
    this.type = type;
    this.economySeats = economySeats;
    this.base = base;
  }

  getIdent() {
    return this.ident;
  }

  getType() {
    return this.type;
  }

  getEconomySeatsNumber() {
    return this.economySeats;
  }

  getBase() {
    return this.base;
  }
}
