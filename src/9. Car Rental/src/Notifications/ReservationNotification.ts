import AbstractReservationNotification from "./AbstractReservationNotification";

export default class ReservationNotification extends AbstractReservationNotification {
  public getText(): string {
    return "Vehicle is reserved";
  }
}
