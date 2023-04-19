import Seat from "./Seat";

export default class Aircraft {
  public constructor(
    private readonly seats: Set<Seat>
  ) {
  }

  public getSeats(): Seat[] {
    return Array.from(this.seats);
  }
}
