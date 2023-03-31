import UserStatus from "./UserStatus";

export default abstract class User {
  private status: UserStatus;

  public constructor(
    private readonly username: string,
    private password: string,
  ) {
  }

  public activate(): void {
    this.status = UserStatus.Active;
  }

  public cancel(): void {
    this.status = UserStatus.Canceled;
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }

  public resetPassword(currentPassword: string, newPassword: string) {
    if (!this.isValidPassword(currentPassword)) {
      throw new Error('Current password is not valid');
    }

    this.password = newPassword;
  }
}
