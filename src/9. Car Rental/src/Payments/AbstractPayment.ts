import PaymentStatus from "./PaymentStatus";
import Person from "../Users/Person";

export default abstract class AbstractPayment {
  private status: PaymentStatus = PaymentStatus.PENDING;

  public constructor(
    private readonly amount: number,
  ) {
  }

  public getAmount(): number {
    return this.amount;
  }

  public isPayed(): boolean {
    return this.status === PaymentStatus.PAYED;
  }

  public pay(person: Person): this {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error("Payment can't be payed")
    }

    person.subtractMoney(this.amount);
    this.status = PaymentStatus.PAYED;

    return this;
  }

  public refund(): this {
    this.status = PaymentStatus.REFUND;
    return this;
  }
}
