import { VoteType } from "./VoteType";
import Vote from "./Vote";
import User from "../../Auth/Users/User";
import Writer from "../../Auth/Users/Writer";
import Message from "../../Forum/Messages/Message";
import System from "../../System";
import VoteNotification from "../../Notifications/VoteNotification";

export default class Voting {
  public static readonly DECISION_VOTE_NUM = 3;
  private readonly votes = new Map<VoteType, Map<User, Vote>>();

  public constructor(
    private readonly message: Message,
  ) {
    this.votes.set(VoteType.Up, new Map());
    this.votes.set(VoteType.Down, new Map());
    this.votes.set(VoteType.Close, new Map());
    this.votes.set(VoteType.Delete, new Map());
  }

  public voteUp(author: User): void {
    this.votes.get(VoteType.Down)
      .delete(author)
    this.votes.get(VoteType.Up)
      .set(author, new Vote(author, VoteType.Up));
    System.getInstance()
      .getReputationController()
      .updateReputation(this.message);
    new VoteNotification(this.message.getAuthor(), this.message)
      .send();
  }

  public voteDown(author: User): void {
    this.votes.get(VoteType.Up)
      .delete(author)
    this.votes.get(VoteType.Down)
      .set(author, new Vote(author, VoteType.Down));
    System.getInstance()
      .getReputationController()
      .updateReputation(this.message);
    new VoteNotification(this.message.getAuthor(), this.message)
      .send();
  }

  public getRate(): number {
    return this.votes.get(VoteType.Up).size - this.votes.get(VoteType.Down).size;
  }

  public voteClose(author: Writer): void {
    if (!author.canVoteClose()) {
      return;
    }

    this.votes.get(VoteType.Close)
      .set(author, new Vote(author, VoteType.Close));
  }

  public getClosesNum(): number {
    return this.votes.get(VoteType.Close).size;
  }

  public voteDelete(author: Writer): void {
    if (!author.canVoteDelete()) {
      return;
    }

    this.votes.get(VoteType.Delete)
      .set(author, new Vote(author, VoteType.Delete));
  }

  public getDeletesNum(): number {
    return this.votes.get(VoteType.Close).size;
  }
}
