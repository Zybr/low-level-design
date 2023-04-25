import AbstractNotification from "./AbstractNotification";
import User from "../Auth/Users/User";
import AbstractMessage from "../Page/Message/AbstractMessage";

export default class ShareNotification extends AbstractNotification {
  public constructor(
    receiver,
    private readonly sender: User,
    private readonly message: AbstractMessage,
  ) {
    super(receiver);
  }

  public getSender(): User {
    return this.sender;
  }

  public getMessage(): AbstractMessage {
    return this.message;
  }
}
