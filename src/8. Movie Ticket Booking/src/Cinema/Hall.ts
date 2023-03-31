import AbstractSeat from "./AbstractSeat";
import SilverSeat from "./SilverSeat";
import GoldSeat from "./GoldSeat";
import PlatinumSeat from "./PlatinumSeat";
import Cinema from "./Cinema";

export default class Hall {
  private readonly seats: AbstractSeat[] = [];

  public constructor(
    private readonly cinema: Cinema,
    silverCount: number,
    goldCount: number,
    platinumCount: number,
  ) {
    let num = 1;

    for (let i = 0; i < silverCount; i++) {
      this.seats.push(new SilverSeat(this, num++));
    }

    for (let i = 0; i < goldCount; i++) {
      this.seats.push(new GoldSeat(this, num++));
    }

    for (let i = 0; i < platinumCount; i++) {
      this.seats.push(new PlatinumSeat(this, num++));
    }
  }

  public getCinema(): Cinema {
    return this.cinema;
  }

  public getSeats(): AbstractSeat[] {
    return this.seats;
  }
}
