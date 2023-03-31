import Notification from "./Notification";

export default class ReservationNotification extends Notification {
  public getText(): string {
    return 'You table will be available in an hour';
  }
}
