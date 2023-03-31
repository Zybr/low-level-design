import User from "./User";
import RoomKey from "../../Keys/RoomKey";
import Booking from "../../Booking";
import System from "../../System";
import RoomType from "../../Hotel/Room/RoomType";
import CardPayment from "../../Payments/CardPayment";
import Key from "../../Keys/Key";

export default class Guest extends User {
  private money: number = 0;
  private key: RoomKey | null = null;

  public getMoney(): number {
    return this.money;
  }

  public addMoney(amount: number): void {
    this.money += amount;
  }

  public subMoney(amount: number): number {
    if (amount > this.money) {
      throw new Error('Guest has not enough money');
    }
    this.money -= amount;

    return amount;
  }

  public setKey(key: RoomKey): void {
    if (this.key) {
      throw new Error('User already has a room key');
    }

    this.key = key;
  }

  public getKey(): RoomKey | null {
    return this.key;
  }

  public unsetKey(): Key {
    if (!this.key) {
      throw new Error("User doesn't have key");
    }

    const key = this.key;
    this.key = null;

    return key;
  }

  public book(hotel, costMin: number, costMax: number, type: RoomType, start: Date, end: Date): Booking {
    if (System.getInstance().getCurrentBooking(this)) {
      throw new Error('User already has active booking'); // TODO:  Allow to book in advance
    }

    const room = System.getInstance()
      .getCatalog()
      .search({
        hotel,
        costMin,
        costMax,
        types: [type]
      })[0];

    if (!room) {
      throw new Error('Room is not defined');
    }

    return System.getInstance()
      .book(this, room, start, end);
  }

  public confirm(booking: Booking): void {
    const payment = new CardPayment(booking.getPrepaymentCost());
    payment.pay(this.subMoney(payment.getAmount()));
    booking.confirm(payment);
  }

  public cancel(): void {
    const booking = System.getInstance()
      .getCurrentBooking(this);

    booking.cancel();
  }
}
