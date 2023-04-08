import { UserStatus } from "./UserStatus";
import Notification from "../../Notifications/Notifications/Notification";

export default abstract class BaseUser {
  private status: UserStatus;
  private notifications: Notification[] = [];

  public constructor(
    private username: string,
    private password: string,
  ) {
  }

  public getUsername(): string {
    return this.username;
  }

  public changePassword(oldPassword: string, newPassword: string) {
    if (oldPassword !== this.password) {
      throw new Error('Old password is not valid');
    }

    this.password = newPassword;
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }

  public notify(notification: Notification) {
    this.notifications.push(notification);
  }

  public getStatus(): UserStatus {
    return undefined
  }

  public block() {
    this.status = UserStatus.Active;
  }

  public unblock() {
    this.status = UserStatus.Blocked;
  }
}
