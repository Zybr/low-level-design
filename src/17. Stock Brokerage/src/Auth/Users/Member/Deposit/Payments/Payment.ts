import { PaymentStatus } from "./PaymentStatus";
import MoneySource from "../MoneySources/MoneySource";

export default abstract class Payment<Source extends MoneySource> {
  private status: PaymentStatus = PaymentStatus.Pending;

  public constructor(
    private readonly amount: number,
  ) {
  }

  public getAmount(): number {
    return this.amount;
  }

  public isPayed(): boolean {
    return this.status === PaymentStatus.Payed;
  }

  public pay(source: Source) {
    if (this.isPayed()) {
      throw new Error('Payment is payed already');
    }

    source.subMoney(this.getAmount());
    this.status = PaymentStatus.Payed;
  }
}
