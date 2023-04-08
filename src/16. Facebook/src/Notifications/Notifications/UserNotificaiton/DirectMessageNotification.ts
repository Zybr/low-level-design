import UserNotification from "./UserNotification";
import User from "../../../Group/Users/User/User";

export default class DirectMessageNotification extends UserNotification {
  public constructor(
    receiver: User,
    sender: User,
    private readonly text: string
  ) {
    super(receiver, sender);
  }

  public getText(): string {
    return this.text;
  }

  public answer(text: string) {
    new DirectMessageNotification(this.getSender(), this.getReceiver(), text);
  }
}
