import User from "../../../Group/Users/User/User";
import Notification from "../Notification";

export default class UserNotification extends Notification{
  public constructor(
    receiver: User,
    private readonly sender: User
  ) {
    super(receiver);
  }

  public getSender(): User {
    return this.sender;
  }
}
