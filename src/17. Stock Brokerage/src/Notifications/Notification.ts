import Member from "../Auth/Users/Member/Member";

export default abstract class Notification {
  public constructor(
    private readonly receiver: Member
  ) {
    receiver.notify(this);
  }

  public getReceiver(): Member {
    return this.receiver;
  }
}
