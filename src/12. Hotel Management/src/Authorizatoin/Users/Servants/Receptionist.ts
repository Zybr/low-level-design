import Servant from "./Servant";
import Room from "../../../Hotel/Room/Room";
import RoomType from "../../../Hotel/Room/RoomType";
import Guest from "../Guest";
import System from "../../../System";
import CardPayment from "../../../Payments/CardPayment";
import Booking from "../../../Booking";

export default class Receptionist extends Servant {
  // TODO: Booking methods

  public createRoom(type: RoomType): Room {
    const room = this.hotel.createRoom(type);
    System.getInstance()
      .getCatalog()
      .add(room);

    return room;
  }

  public removeRoom(room: Room): void {
    this.hotel.removeRoom(room);
    System.getInstance()
      .getCatalog()
      .remove(room);
  }

  // TODO: Check period

  public checkIn(guest: Guest): void {
    const booking = this.getGuestBooking(guest);
    const cost = booking.getRestPaymentCost();
    const payment = new CardPayment(cost);
    const key = this.hotel
      .getKeyRack()
      .popRoomKey(booking.getRoom())

    payment.pay(guest.subMoney(payment.getAmount()));
    booking.pay(payment);
    guest.setKey(key);
  }

  public checkOut(guest: Guest): void {
    const booking = this.getGuestBooking(guest);
    const key = guest.unsetKey();

    this.hotel
      .getKeyRack()
      .putKey(key);
    booking
      .getRoom()
      .checkOut();
    booking
      .getRoom()
      .getHotel()
      .getHousekeepers()[0]
      .clean();
  }

  private getGuestBooking(guest: Guest): Booking {
    const booking = System.getInstance()
      .getCurrentBooking(guest);

    if (!booking) {
      throw new Error('There is no booking for the user');
    }

    if (booking.getRoom().getHotel() !== this.hotel) {
      throw new Error('Booking hotel is note correct');
    }

    return booking;
  }
}
