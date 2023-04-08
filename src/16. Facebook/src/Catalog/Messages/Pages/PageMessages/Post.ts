import PageMessage from "./PageMessage";
import User from "../../../../Group/Users/User/User";
import System from "../../../../System";
import CreatedPostNotification from "../../../../Notifications/Notifications/CreatedPostNotification";

export default class Post extends PageMessage {
  public constructor(
    author: User,
    text: string
  ) {
    super(author, text);
    System.getInstance()
      .getSubscriptionsList()
      .getUserFollowers(this.getAuthor())
      .forEach(follower => new CreatedPostNotification(follower, this));
  }
}
