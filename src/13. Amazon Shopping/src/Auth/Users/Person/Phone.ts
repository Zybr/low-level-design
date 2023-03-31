import PhoneNotification from "../../../Notifications/PhoneNotification";

export default class Phone {
  private readonly notifications: PhoneNotification[] = [];

  public constructor(
    private readonly number: string,
  ) {
  }

  public getNumber(): string {
    return this.number;
  }

  public notify(notification: PhoneNotification): void {
    this.notifications.push(notification);
  }

  public getNotifications(): PhoneNotification[] {
    return this.notifications;
  }
}
