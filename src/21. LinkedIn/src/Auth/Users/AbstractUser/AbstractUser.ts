import { UserStatus } from "./UserStatus";

export default abstract class AbstractUser {
  private status: UserStatus = UserStatus.Active;

  public constructor(
    private readonly username: string,
    private password: string,
  ) {
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

  public block() {
    this.status = UserStatus.Active;
  }

  public unblock() {
    this.status = UserStatus.Blocked;
  }

  public isActive(): boolean {
    return this.status === UserStatus.Active;
  }
}
