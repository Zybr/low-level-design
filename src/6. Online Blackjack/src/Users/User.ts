import Person from "./Person";
import UserStatus from "./UserStatus";

export default class User {
  private status = UserStatus.ACTIVE;

  public constructor(
    private readonly person: Person,
    private readonly username: string,
    private password: string
  ) {
  }

  public getPerson(): Person {
    return this.person;
  }

  public getUsername(): string {
    return this.username;
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }

  public resetPassword(oldPassword: string, newPassword: string) {
    if (this.isValidPassword(oldPassword)) {
      this.password = newPassword;
    } else {
      throw new Error('Invalid source password');
    }
  }

  public deactivate() {
    this.status = UserStatus.INACTIVE;
  }
}
