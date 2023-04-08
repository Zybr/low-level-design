import RequestNotification from "./RequestNotification";
import FriendShipNotification from "../../FriendShipNotification";

export default class FriendshipRequestNotification extends RequestNotification {
  public accept() {
    this.assertNotHandled();
    this.getSender()
      .getFriendsList()
      .addUser(this.getReceiver());
    this.handle();

    new FriendShipNotification(
      this.getSender(),
      this.getReceiver()
    );
  }
}
