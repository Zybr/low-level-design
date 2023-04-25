import User from "../Auth/Users/User";
import { InvitationStatus } from "./InvitationStatus";

export default abstract class AbstractInvitation {
  protected status: InvitationStatus = InvitationStatus.Pending;

  public constructor(
    private readonly receiver: User
  ) {
  }

  public getReceiver(): User {
    return this.receiver;
  }

  public abstract accept();

  public reject() {
    this.assertIsPending();
    this.status = InvitationStatus.Rejected;
  }

  public cancel() {
    this.assertIsPending();
    this.status = InvitationStatus.Canceled;
  }

  public isPending(): boolean {
    return this.status !== InvitationStatus.Pending;
  }

  private assertIsPending() {
    if (!this.isPending()) {
      throw new Error('Invitation is already processed');
    }
  }
}
