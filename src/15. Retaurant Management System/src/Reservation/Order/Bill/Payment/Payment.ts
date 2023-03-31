import { PaymentStatus } from "./PaymentStatus";

export default abstract class Payment {
  protected status: PaymentStatus = PaymentStatus.Pending;

  public constructor(
    protected readonly amount: number,
  ) {
  }

  public getAmount(): number {
    return this.amount;
  }

  public abstract pay(source: any);

  public isPayed(): boolean {
    return this.status === PaymentStatus.Payed;
  }
}
