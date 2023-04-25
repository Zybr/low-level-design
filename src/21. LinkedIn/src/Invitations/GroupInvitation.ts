import AbstractInvitation from "./AbstractInvitation";
import User from "../Auth/Users/User";
import Group from "../Group/Group";
import { InvitationStatus } from "./InvitationStatus";
import InvitationNotification from "../Notification/InvitationNotification";

export default class GroupInvitation extends AbstractInvitation {
  public constructor(
    receiver: User,
    private readonly group: Group,
  ) {
    super(receiver);
    new InvitationNotification(receiver, this)
  }

  public accept() {
    this.group.addMember(this.getReceiver());
    this.status = InvitationStatus.Accepted;
  }
}
