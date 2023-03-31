import Account from "../Auth/Users/Account";

export default abstract class Notification {
  protected constructor(
    private readonly receiver: Account,
  ) {
  }

  public send(): void {
    this.receiver.notify(this);
  }

  public abstract getText(): string;
}

