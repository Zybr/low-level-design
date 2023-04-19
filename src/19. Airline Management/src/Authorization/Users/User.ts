import { UserStatus } from "./UserStatus";
import Notification from "../../Notification/Notification";

export default abstract class User {
  private status: UserStatus = UserStatus.Active;
  private readonly notifications: Notification[] = [];

  public constructor(
    private readonly username: string,
    private password: string
  ) {
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }

  public resetPassword(oldPassword: string, newPassword: string) {
    if (!this.isValidPassword(oldPassword)) {
      throw new Error('Old password is not valid');
    }

    this.password = newPassword;
  }

  public isActive(): boolean {
    return this.status === UserStatus.Active;
  }

  public block() {
    this.status = UserStatus.Blocked;
  }

  public unblock() {
    this.status = UserStatus.Active;
  }

  public notify(notification: Notification) {
    this.notifications.push(notification);
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }
}
