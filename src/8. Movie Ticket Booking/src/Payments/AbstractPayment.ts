import PaymentStatus from "./PaymentStatus";

export default abstract class AbstractPayment {
  private status: PaymentStatus = PaymentStatus.PENDING;

  public constructor(
    private readonly money: number,
  ) {
  }

  public getMoney(): number {
    return this.money;
  }

  public pay(money): this {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error('Payment is already payed');
    }

    if (this.money !== money) {
      throw new Error('Invalid amount of money');
    }

    this.status = this.status = PaymentStatus.PAYED;

    return this;
  }

  public refund(): this {
    if (this.status !== PaymentStatus.PAYED) {
      throw new Error('Payment is not confirmed');
    }

    this.status = PaymentStatus.REFUNDED;

    return this;
  }

  public isPending(): boolean {
    return this.status === PaymentStatus.PENDING;
  }

  public isPayed(): boolean {
    return this.status === PaymentStatus.PAYED;
  }

  public isRefunded(): boolean {
    return this.status === PaymentStatus.REFUNDED;
  }
}
