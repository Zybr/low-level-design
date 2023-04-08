import User from "../../Group/Users/User/User";

export default abstract class Notification {
  protected constructor(
    private readonly receiver: User,
  ) {
    this.receiver.notify(this);
  }

  public getReceiver(): User {
    return this.receiver;
  }
}
