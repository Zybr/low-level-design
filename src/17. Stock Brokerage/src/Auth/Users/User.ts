import { UserStatus } from "./UserStatus";
import Notification from "../../Notifications/Notification";

export default abstract class User {
  private status: UserStatus = UserStatus.Active;
  private readonly notifications: Notification[] = [];

  public constructor(
    private readonly username: string,
    private password: string,
  ) {
  }

  public getUsername(): string {
    return this.username;
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }

  public setPassword(oldPassword: string, newPassword: string): void {
    if (!this.isValidPassword(oldPassword)) {
      throw new Error('Current password is not valid');
    }

    this.password = newPassword;
  }

  public notify(notification: Notification) {
    this.notifications.push(notification);
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }

  public block() {
    if (this.isCanceled()) {
      throw new Error("Canceled user can't be blocked");
    }

    this.status = UserStatus.Blocked;
  }

  public activate() {
    this.status = UserStatus.Active;
  }

  public cancel() {
    if (this.isBlocked()) {
      throw new Error("Blocked user can't be canceled");
    }

    this.status = UserStatus.Canceled;
  }

  public isActive(): boolean {
    return this.status === UserStatus.Active;
  }

  public isBlocked(): boolean {
    return this.status === UserStatus.Blocked;
  }

  public isCanceled(): boolean {
    return this.status === UserStatus.Canceled;
  }
}
