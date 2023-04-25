import User from "../Auth/Users/User";
import AbstractNotification from "./AbstractNotification";
import Post from "../Page/Message/Post";
import Comment from "../Page/Message/Comment";

export default class CommentNotification extends AbstractNotification {
  public constructor(
    receiver: User,
    private readonly post: Post,
    private readonly comment: Comment,
  ) {
    super(receiver)
  }

  public getPost(): Post {
    return this.post;
  }

  public getComment(): Comment {
    return this.comment;
  }
}
