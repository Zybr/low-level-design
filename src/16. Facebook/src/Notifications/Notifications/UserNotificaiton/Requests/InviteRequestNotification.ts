import User from "../../../../Group/Users/User/User";
import Group from "../../../../Group/Group";
import RequestNotification from "./RequestNotification";

export default class InviteRequestNotification extends RequestNotification {
  public constructor(
    receiver: User,
    sender: User,
    private readonly group: Group
  ) {
    super(receiver, sender);
  }

  public getGroup(): Group {
    return this.group;
  }

  public accept() {
    this.assertNotHandled();
    this.group.addUser(this.getReceiver());
    this.handle();
  }
}
