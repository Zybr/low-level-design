import AbstractReservationNotification from "./AbstractReservationNotification";

export default class OverdueNotification extends AbstractReservationNotification {
  public getText(): string {
    return "Reservation is overdue";
  }
}
