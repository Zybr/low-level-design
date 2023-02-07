import AbstractNotificationObserver from "./AbstractNotificationObserver";
import Address from "../../Users/People/Address";

export default class PostBoxObserver extends AbstractNotificationObserver {
  public constructor(
    private readonly address: Address
  ) {
    super();
  }
}
