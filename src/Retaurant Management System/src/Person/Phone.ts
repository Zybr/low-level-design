import Notification from "../Notification/Notification";

export default class Phone {
  private readonly notifications: Notification[]

  public constructor(
    private readonly number: string,
  ) {
  }

  public getNumber(): string {
    return this.number;
  }

  public pushNotification(notification: Notification): void {
    this.notifications.push(notification);
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }
}
