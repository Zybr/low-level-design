import ReservationNotification from "./ReservationNotification";
import OverdueNotification from "./OverdueNotification";
import CancelingNotification from "./CancelingNotification";
import AbstractReservationNotification from "./AbstractReservationNotification";

export default class Messenger {
  private readonly notifications = new Map<string, AbstractReservationNotification[]>([
    [OverdueNotification.name, []],
    [ReservationNotification.name, []],
    [CancelingNotification.name, []],
  ]);

  public notify(notification: AbstractReservationNotification) {
    this.notifications.get(notification.constructor.name).push(notification)
  }

  public getReservationNotifications(): ReservationNotification[] {
    return this.notifications.get(ReservationNotification.name);
  }

  public getCancellingNotifications(): CancelingNotification[] {
    return this.notifications.get(CancelingNotification.name);
  }

  public getOverdueNotifications(): OverdueNotification[] {
    return this.notifications.get(OverdueNotification.name);
  }
}
