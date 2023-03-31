import Notification from "../Notification";

export default abstract class AbstractNotificationObserver {
  protected messages: Notification[] = [];

  public getNotifications(): Notification[] {
    return this.messages;
  }

  public notify(notification: Notification): void {
    this.messages.push(notification);
  }
}
