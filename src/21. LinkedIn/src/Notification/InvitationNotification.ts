import AbstractInvitation from "../Invitations/AbstractInvitation";
import User from "../Auth/Users/User";
import AbstractNotification from "./AbstractNotification";

export default class InvitationNotification<Invitation extends AbstractInvitation> extends AbstractNotification {
  public constructor(
    receiver: User,
    private readonly invitation: Invitation
  ) {
    super(receiver);
  }

  public getInvitation(): Invitation {
    return this.invitation;
  }
}
