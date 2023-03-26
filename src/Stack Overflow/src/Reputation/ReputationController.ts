import { BadgeType } from "./Badge/BadgeType";
import Message from "../Forum/Messages/Message";
import Badge from "./Badge/Badge";
import AwardNotification from "../Notifications/AwardNotification";

export default class ReputationController {
  private milestones = {
    1: BadgeType.Silver,
    3: BadgeType.Gold,
    10: BadgeType.Platinum,
  }

  public updateReputation(message: Message): void {
    const writer = message.getAuthor()
    const badgeType = this.milestones[message.getAuthor().getRate()];

    if (badgeType !== undefined && !writer.hasBadge(badgeType)) {
      const badge = new Badge(badgeType);
      writer.addBadge(badge);
      new AwardNotification(message.getAuthor(), badge)
        .send()
    }
  }
}
