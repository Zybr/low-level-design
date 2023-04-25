import User from "../Auth/Users/User";

export default abstract class AbstractNotification {
  public constructor(
    private readonly receiver: User
  ) {
    receiver.notify(this);
  }

  public getReceiver(): User {
    return this.receiver;
  }
}
