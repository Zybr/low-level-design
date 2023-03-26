import Writer from "../../Auth/Users/Writer";
import Flag from "../../Reputation/Flag";
import Voting from "../../Reputation/Vote/Voting";
import User from "../../Auth/Users/User";

export default abstract class Message {
  private readonly flags = new Map<Writer, Flag>();
  private readonly createdAt = new Date();
  protected readonly voting = new Voting(this);
  private updatedAt = new Date();

  protected constructor(
    private readonly author: Writer,
    private text: string,
  ) {
  }

  public getAuthor(): Writer {
    return this.author;
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
    this.updateChangeTime();
  }

  public flag(author: Writer): void {
    if (this.flags.has(author)) {
      return;
    }

    this.flags.set(author, new Flag())
  }

  public getFlags(): Flag[] {
    return Array.from(this.flags.values());
  }

  public voteUp(author: User): void {
    this.voting.voteUp(author);
  }

  public getRate(): number {
    return this.voting.getRate();
  }

  protected updateChangeTime(): void {
    this.updatedAt = new Date();
  }
}
