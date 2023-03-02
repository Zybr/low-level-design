import Reservation from "../Reservation/Reservation";
import AbstractPayment from "./AbstractPayment";

export default class Fine {
  private payment: AbstractPayment | null = null;

  public constructor(
    private readonly reservation: Reservation,
    private readonly amount: number
  ) {
  }

  public pay(payment: AbstractPayment) {
    if (!payment.isPayed() || payment.getAmount() !== this.amount) {
      throw new Error("Invalid payment");
    }

    this.reservation.done();
  }
}
