import EmailNotification from "../../../Notifications/EmailNotification";

export default class Email {
  private readonly notifications: EmailNotification[] = [];

  public constructor(
    private readonly address: string,
  ) {
  }

  public getAddress(): string {
    return this.address;
  }

  public notify(notification: EmailNotification): void {
    this.notifications.push(notification);
  }

  public getNotifications(): EmailNotification[] {
    return this.notifications;
  }
}
