import Notification from "./Notification";
import User from "../../Group/Users/User/User";
import Post from "../../Catalog/Messages/Pages/PageMessages/Post";

export default class CreatedPostNotification extends Notification {
  public constructor(
    receiver: User,
    private readonly post: Post,
  ) {
    super(receiver);
  }

  public getPost(): Post {
    return this.post;
  }
}
