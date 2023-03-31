import Payment from "./Payment/Payment";

export default class Bill {
  private payment: Payment | null;

  public constructor(
    private readonly amount: number
  ) {
  }

  public getAmount(): number {
    return this.amount;
  }

  public pay(payment: Payment): void {
    if (!payment.isPayed()) {
      throw new Error('Payment is not payed');
    }

    if (payment.getAmount() !== this.amount) {
      throw new Error('Payment amount is not correct');
    }

    this.payment = payment;
  }

  public isPayed(): boolean {
    return !!this.payment?.isPayed();
  }
}
