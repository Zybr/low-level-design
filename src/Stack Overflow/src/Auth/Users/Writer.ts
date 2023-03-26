import Account from "./Account";
import Badge from "../../Reputation/Badge/Badge";
import { BadgeType } from "../../Reputation/Badge/BadgeType";
import Bounty from "../../Reputation/Bounty";
import System from "../../System";
import Question from "../../Forum/Messages/Questoin/Questoin";
import Message from "../../Forum/Messages/Message";
import Answer from "../../Forum/Messages/Answer";

export default class Writer extends Account {
  private readonly badges = new Map<BadgeType, Badge>()
  private readonly bounties: Bounty[] = [];

  public addBounty(bounty: Bounty): void {
    this.bounties.push(bounty);
  }

  public addBadge(badge: Badge): void {
    this.badges.set(badge.getType(), badge);
  }

  public getBadges(): Badge[] {
    return Array.from(this.badges.values());
  }

  public hasBadge(type): boolean {
    return this.badges.has(type);
  }

  public getRate(): number {
    let rate = System.getInstance()
      .getCatalog()
      .searchMessagesByAuthor(this.getUsername())
      .reduce(
        (sum, msg) => sum + msg.getRate(),
        0
      );

    rate += this.bounties.reduce(
      (sum, bounty) => sum + bounty.getRate(),
      0
    )

    return rate;
  }

  // Writing >>>

  public postQuestion(text: string, title: string, tags: string[]): void {
    System.getInstance()
      .getCatalog()
      .createQuestion(this, text, title, tags)
  }

  public postAnswer(question: Question, text: string): void {
    question.createAnswer(this, text);
  }

  public postComment(message: Question | Answer, text: string): void {
    message.createComment(this, text);
  }

  // <<< Writing

  // Rights >>>

  public canVoteClose(): boolean {
    return this.hasBadge(BadgeType.Gold);
  }

  public canVoteDelete(): boolean {
    return this.hasBadge(BadgeType.Gold);
  }

  public canCreateTag(): boolean {
    return this.hasBadge(BadgeType.Gold);
  }

  // <<< Rights
}
