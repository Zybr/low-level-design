import AbstractInvitation from "./AbstractInvitation";
import User from "../Auth/Users/User";
import { InvitationStatus } from "./InvitationStatus";
import InvitationNotification from "../Notification/InvitationNotification";

export default class ConnectionInvitation extends AbstractInvitation {
  public constructor(
    receiver: User,
    private readonly sender: User,
  ) {
    super(receiver);

    new InvitationNotification(receiver, this);
  }

  public accept() {
    this.sender.getConnectionsList().addConnection(this.getReceiver());
    this.status = InvitationStatus.Accepted;
  }
}
