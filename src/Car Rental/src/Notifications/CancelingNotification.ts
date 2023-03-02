import AbstractReservationNotification from "./AbstractReservationNotification";

export default class CancelingNotification extends AbstractReservationNotification {
  public getText(): string {
    return "Reservation is canceled";
  }
}
