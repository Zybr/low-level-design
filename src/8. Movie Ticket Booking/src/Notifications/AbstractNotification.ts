import User from "../Persons/User";

export default abstract class AbstractNotification {
  protected constructor(
    protected readonly user: User
  ) {
  }

  public send(): void {
    this.user.notify(this);
  }
}
