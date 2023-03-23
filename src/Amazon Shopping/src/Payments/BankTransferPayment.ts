import Payment from "./Payment";
import { PaymentStatus } from "./PaymentStatus";

export default class BankTransferPayment extends Payment {
  public pay(amount: number): void {
    if (this.amount !== amount) {
      throw new Error('Invalid payment amount');
    }

    this.status = PaymentStatus.Payed;
  }
}
