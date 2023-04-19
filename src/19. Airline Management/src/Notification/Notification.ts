import User from "../Authorization/Users/User";

export default abstract class Notification {
  public constructor(
    private readonly receiver: User
  ) {
    this.receiver.notify(this);
  }
}
