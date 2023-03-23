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

  public abstract pay(by: any): void

  public refund(): void {
    this.status = PaymentStatus.Refund;
  }

  public isPending(): boolean {
    return this.status === PaymentStatus.Pending;
  }

  public isPayed(): boolean {
    return this.status === PaymentStatus.Payed;
  }

  public isRefund(): boolean {
    return this.status === PaymentStatus.Refund;
  }
}
