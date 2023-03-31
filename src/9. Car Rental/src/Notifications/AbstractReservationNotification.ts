import Reservation from "../Reservation/Reservation";

export default abstract class AbstractReservationNotification {
  public constructor(
    private readonly reservation: Reservation,
  ) {
  }

  public abstract getText(): string;

  public getReservation(): Reservation {
    return this.reservation;
  }
}
