import User from "../Authorization/Users/User";
import Reservation from "../Itinerary/Reservation/Reservation";
import Notification from "./Notification";

export default abstract class ReservationNotification extends Notification {
  public constructor(
    receiver: User,
    private readonly reservation: Reservation
  ) {
    super(receiver);
  }
}
