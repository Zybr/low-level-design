import Show from "./Show";
import AbstractSeat from "./Cinema/AbstractSeat";
import AbstractPayment from "./Payments/AbstractPayment";
import Ticket from "./Ticket";
import User from "./Persons/User";
import BookedNotification from "./Notifications/BookedNotification";

export default class Booking {
  private payment: AbstractPayment = null;

  public constructor(
    private readonly user: User,
    private readonly cost: number,
    private readonly show: Show,
    private readonly seat: AbstractSeat,
  ) {
    new BookedNotification(user, this).send();
  }

  public getUser(): User {
    return this.user;
  }

  public getCost(): number {
    return this.cost;
  }

  public getShow(): Show {
    return this.show;
  }

  public getSeat(): AbstractSeat {
    return this.seat;
  }

  public getPayment(): AbstractPayment | null {
    return this.payment;
  }

  public confirm(payment: AbstractPayment): Ticket {
    if (this.isConfirmed()) {
      throw new Error('Booking is already confirmed');
    }

    if (!payment.isPayed()) {
      throw new Error('Payment is not payed');
    }

    if (payment.getMoney() !== this.cost) {
      throw new Error('Payment amount is not equal booking cost');
    }

    this.payment = payment;

    return new Ticket(this)
  }

  public isConfirmed(): boolean {
    return this.payment && this.payment.isPayed();
  }
}
