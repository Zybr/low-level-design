import Booking from "../Booking";
import Notification from "./Notification";

export default class ReservationNotification extends Notification {
  public constructor(
    private readonly booking: Booking
  ) {
    super()
  }

  public getBooking(): Booking {
    return this.booking;
  }
}
