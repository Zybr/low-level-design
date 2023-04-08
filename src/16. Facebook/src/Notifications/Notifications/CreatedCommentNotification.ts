import Notification from "./Notification";
import User from "../../Group/Users/User/User";
import Comment from "../../Catalog/Messages/Pages/PageMessages/Comment";

export default class CreatedCommentNotification extends Notification {
  public constructor(
    receiver: User,
    private readonly comment: Comment,
  ) {
    super(receiver);
  }

  public getComment(): Comment {
    return this.comment;
  }
}
