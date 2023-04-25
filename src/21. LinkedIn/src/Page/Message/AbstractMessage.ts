import User from "../../Auth/Users/User";
import { Reaction } from "./Reaction";
import AuthoredInterface from "../AuthoredInterface";

export default abstract class AbstractMessage implements AuthoredInterface {
  private readonly createdAt = new Date();
  private updatedAt = new Date();
  private readonly reactions = new Map<User, Reaction>();

  public constructor(
    private readonly author: User,
    private text: string,
  ) {
  }

  public getAuthor(): User {
    return this.author;
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string) {
    this.text = text;
    this.updateChangingTime();
  }

  public getLikes(): number {
    return this.getReactionsByType(Reaction.Like).length
  }

  public getDislikes(): number {
    return this.getReactionsByType(Reaction.Dislike).length
  }

  public like(author: User) {
    this.reactions.set(author, Reaction.Like);
  }

  public dislike(author: User) {
    this.reactions.set(author, Reaction.Dislike);
  }

  private getReactionsByType(type: Reaction): Reaction[] {
    return Array.from(this.reactions.values())
      .filter(reaction => reaction === type)
  }

  private updateChangingTime() {
    this.updatedAt = new Date();
  }
}
