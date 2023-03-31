import Person from "./Person/Person";
import EmailNotification from "../../Notifications/EmailNotification";
import PhoneNotification from "../../Notifications/PhoneNotification";
import { UserStatus } from "./UserStatus";

export default abstract class User {
  private status: UserStatus = UserStatus.Active;

  public constructor(
    private readonly person: Person,
    private readonly username: string,
    private password: string,
  ) {
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }

  public resetPassword(oldPassword: string, newPassword: string) {
    if (!this.isValidPassword(oldPassword)) {
      throw new Error('Old password is not correct')
    }

    this.password = newPassword;
  }

  public notify(msgText: string): void {
    const emailNotification = new EmailNotification(msgText);
    const phoneNotification = new PhoneNotification(msgText);

    this.person.getEmail()?.notify(emailNotification);
    this.person.getPhone()?.notify(phoneNotification);
  }

  public isActive(): boolean {
    return this.status === UserStatus.Active;
  }

  public isBlocked(): boolean {
    return this.status === UserStatus.Blocked;
  }

  public block(): void {
    this.status = UserStatus.Blocked;
  }

  public unblock(): void {
    this.status = UserStatus.Active;
  }
}
