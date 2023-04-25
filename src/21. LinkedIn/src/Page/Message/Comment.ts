import AbstractMessage from "./AbstractMessage";
import User from "../../Auth/Users/User";
import Post from "./Post";
import CommentNotification from "../../Notification/CommentNotification";

export default class Comment extends AbstractMessage {
  public constructor(
    private readonly post: Post,
    author: User,
    text: string,
  ) {
    super(author, text);
    new CommentNotification(this.post.getAuthor(), this.post, this);
  }

  public remove() {
    this.post.removeComment(this);
  }
}
