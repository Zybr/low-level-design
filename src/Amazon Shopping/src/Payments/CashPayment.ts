import Payment from "./Payment";
import { PaymentStatus } from "./PaymentStatus";
import Wallet from "../Auth/Users/Customer/Wallet/Wallet";

export default class CashPayment extends Payment {
  public pay(wallet: Wallet): void {
    wallet.subtractCash(this.amount);
    this.status = PaymentStatus.Payed;
  }
}
