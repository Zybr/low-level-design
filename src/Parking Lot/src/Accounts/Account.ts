import AccountStatus from "./Enums/AccountStatus";
import Person from "../Person";

export default abstract class Account {
  private status: AccountStatus = AccountStatus.ACTIVE;

  public constructor(
    private person: Person,
    private username: string,
    private password: string,
  ) {
  }

  public resetPassword(newPassword: string): void {
    this.password = newPassword;
  }
}
