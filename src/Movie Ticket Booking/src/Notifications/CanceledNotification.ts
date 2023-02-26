import User from "../Persons/User";
import AbstractNotification from "./AbstractNotification";
import Booking from "../Booking";

export default class CanceledNotification extends AbstractNotification {
  public constructor(
    user: User,
    private readonly booking: Booking
  ) {
    super(user);
  }

  public getBooking(): Booking {
    return this.booking;
  }
}
