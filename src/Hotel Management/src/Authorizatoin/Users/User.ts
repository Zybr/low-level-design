import Notification from "../../Notifications/Notification";
import ReservationNotification from "../../Notifications/ReservationNotification";
import CancelingNotification from "../../Notifications/CancelingNotification";

export default abstract class User {
  private readonly notifications: Notification[] = [];

  public constructor(
    private readonly username: string,
    private password: string
  ) {
  }

  public resetPassword(oldPassword: string, newPassword: string): void {
    if (!this.isValidPassword(oldPassword)) {
      throw new Error('Old password is not valid');
    }

    this.password = newPassword;
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }

  public notify(notification: Notification): void {
    this.notifications.push(notification);
  }

  public getBookingNotifications(): Notification[] {
    return this.notifications.filter(notification => notification instanceof ReservationNotification);
  }

  public getCancelingNotifications(): Notification[] {
    return this.notifications.filter(notification => notification instanceof CancelingNotification);
  }
}
