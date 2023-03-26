import Notification from "./Notification";
import Writer from "../Auth/Users/Writer";
import Badge from "../Reputation/Badge/Badge";

export default class AwardNotification extends Notification {
  public constructor(
    receiver: Writer,
    private readonly badge: Badge,
  ) {
    super(receiver);
  }

  public getText(): string {
    return "Your message has been voted";
  }

  public getBadge(): Badge {
    return this.badge;
  }
}
