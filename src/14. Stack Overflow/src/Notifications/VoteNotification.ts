import Notification from "./Notification";
import Writer from "../Auth/Users/Writer";
import Message from "../Forum/Messages/Message";

export default class VoteNotification extends Notification {
  public constructor(
    receiver: Writer,
    private readonly message: Message,
  ) {
    super(receiver);
  }

  public getText(): string {
    return "Your message has been voted";
  }

  public getMessage(): Message {
    return this.message;
  }
}
