import UserNotification from "./UserNotification";
import User from "../../../Group/Users/User/User";
import PageMessage from "../../../Catalog/Messages/Pages/PageMessages/PageMessage";

export default class ShareNotification extends UserNotification {
  public constructor(
    receiver: User,
    sender: User,
    private readonly message: PageMessage
  ) {
    super(
      receiver,
      sender
    );
  }

  public getMessage(): PageMessage {
    return this.message;
  }
}
