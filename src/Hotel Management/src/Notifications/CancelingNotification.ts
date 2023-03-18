import Booking from "../Booking";
import Notification from "./Notification";

export default class CancelingNotification extends Notification {
  public constructor(
    private readonly booking: Booking
  ) {
    super();
  }

  public getBooking(): Booking {
    return this.booking;
  }
}
