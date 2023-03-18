import PaymentStatus from "./PaymentStatus";

export default abstract class Payment {
  private status: PaymentStatus = PaymentStatus.Pending;
  public readonly createdAt = new Date();

  public constructor(
    private readonly amount: number,
  ) {
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public pay(amount: number): void {
    this.assertStatus(PaymentStatus.Pending);

    if (amount !== this.amount) {
      throw new Error('Amount of money is not correct');
    }

    this.status = PaymentStatus.Payed;
  }

  public refund(): void {
    this.assertStatus(PaymentStatus.Payed);
    this.status = PaymentStatus.Refunded;
  }

  public isPayed(): boolean {
    return this.status === PaymentStatus.Payed;
  }

  private assertStatus(status): void {
    if (this.status !== status) {
      throw new Error(`Payment status is not ${status}`);
    }
  }
}
