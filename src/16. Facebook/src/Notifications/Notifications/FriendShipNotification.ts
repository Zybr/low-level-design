import User from "../../Group/Users/User/User";
import Notification from "./Notification";

export default class FriendShipNotification extends Notification {
  public constructor(
    receiver: User,
    private readonly newFriend: User,
  ) {
    super(receiver);
  }

  public getNewFriend(): User {
    return this.newFriend;
  }
}
