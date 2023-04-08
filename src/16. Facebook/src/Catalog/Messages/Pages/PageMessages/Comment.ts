import User from "../../../../Group/Users/User/User";
import System from "../../../../System";
import CreatedCommentNotification from "../../../../Notifications/Notifications/CreatedCommentNotification";
import Message from "../../Message";

export default class Comment extends Message {
  public constructor(
    author: User,
    text: string
  ) {
    super(author, text);
    System.getInstance()
      .getSubscriptionsList()
      .getUserFollowers(this.getAuthor())
      .forEach(follower => new CreatedCommentNotification(follower, this));
  }
}
