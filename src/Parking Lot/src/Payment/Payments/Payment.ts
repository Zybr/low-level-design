import PaymentStatus from "../Enums/PaymentStatus";

export default abstract class Payment {
  private readonly date: Date;

  public constructor(
    private readonly amount: number,
    private readonly status: PaymentStatus = PaymentStatus.COMPLETED,
  ) {
    this.date = new Date();
  }

  public getDate(): Date {
    return this.date;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getStatus(): PaymentStatus {
    return this.status;
  }
}
