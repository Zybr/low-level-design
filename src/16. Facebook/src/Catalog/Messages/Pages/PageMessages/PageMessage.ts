import Like from "./Like/Like";
import Comment from "./Comment";
import Message from "../../Message";
import User from "../../../../Group/Users/User/User";
import { LikeType } from "./Like/LikeType";
import ShareNotification from "../../../../Notifications/Notifications/UserNotificaiton/ShareNotification";

export default class PageMessage extends Message {
  private readonly likes = new Map<string, Like>()
  private readonly comments: Comment[] = [];

  public getComments(): Comment[] {
    return Array.from(this.comments.values());
  }

  public addComment(author: User, text: string): Comment {
    const comment = new Comment(author, text);
    this.comments.push(comment);

    return comment;
  }

  public getLikesDislikes(): Like[] {
    return Array.from(this.likes.values());
  }

  public getRate(): number {
    return Array.from(this.likes.values())
      .reduce(
        (sum, like) => sum + (like.isUp() ? 1 : -1),
        0
      );
  }

  public getDislikesNum(): number {
    return this.getLikesDislikes()
      .filter(like => like.isDown())
      .length;
  }

  public like(author: User) {
    this.likes.set(author.getUsername(), new Like(LikeType.Up));
  }

  public dislike(author: User) {
    this.likes.set(author.getUsername(), new Like(LikeType.Down));
  }

  public unlike(author: User) {
    this.likes.delete(author.getUsername());
  }

  public share(sender: User, receiver: User) {
    new ShareNotification(receiver, sender, this);
  }
}
