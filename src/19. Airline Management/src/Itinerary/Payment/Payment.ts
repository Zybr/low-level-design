import { PaymentStatus } from "./PaymentStatus";
import Customer from "../../Authorization/Users/Customer/Customer";

export default class Payment {
  private status: PaymentStatus = PaymentStatus.Pending;

  public constructor(
    private readonly payer: Customer,
    private readonly amount: number,
  ) {
  }

  public getAmount(): number {
    return this.amount;
  }

  public isPayed(): boolean {
    return this.status === PaymentStatus.Payed;
  }

  public pay(): this {
    this.assertStatus(PaymentStatus.Pending);
    this.payer.getWallet().subtract(this.amount);
    this.status = PaymentStatus.Payed;

    return this;
  }

  public refund(): this {
    this.assertStatus(PaymentStatus.Payed);
    this.payer.getWallet().add(this.amount);
    this.status = PaymentStatus.Refunded;

    return this;
  }

  private assertStatus(status: PaymentStatus) {
    if (this.status !== status) {
      throw new Error(`Expected status is ${status}`);
    }
  }
}
