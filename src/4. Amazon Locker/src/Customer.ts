import Notification from "./Notification";
import Order from "./Order";

export default class Customer {
  private readonly notifications: Notification[] = [];

  public getNotifications(): Notification[] {
    return this.notifications;
  }

  public notify(notification: Notification): void {
    this.notifications.push(notification);
  }

  public pickLastOrder(): Order {
    const msg = this.notifications.pop();

    if (!msg) {
      throw new Error('There are not messages');
    }

    return msg.getLocker()
      .removePackage(msg.getCode())
      .getOrder();
  }
}
