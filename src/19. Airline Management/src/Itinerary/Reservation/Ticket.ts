import Reservation from "./Reservation";

export default class Ticket {
  public constructor(
    private readonly reservation: Reservation
  ) {
  }

  public getReservation(): Reservation {
    return this.reservation;
  }
}
