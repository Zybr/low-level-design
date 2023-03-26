import { AccountStatus } from "./AccountStatus";
import Notification from "../../Notifications/Notification";
import User from "./User";

export default abstract class Account extends User {
  private status: AccountStatus = AccountStatus.Active;
  private readonly notifications: Notification[] = [];

  public constructor(
    private username: string,
    private password: string,
  ) {
    super();
  }

  public getUsername(): string {
    return this.username;
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }

  public restPassword(oldPassword: string, newPassword: string): void {
    if (this.password !== oldPassword) {
      throw new Error('Old password is not valid');
    }

    this.password = newPassword;
  }

  public notify(notification: Notification): void {
    this.notifications.push(notification);
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }

  public block(): void {
    this.status = AccountStatus.Blocked;
  }

  public unblock(): void {
    this.status = AccountStatus.Active;
  }
}
