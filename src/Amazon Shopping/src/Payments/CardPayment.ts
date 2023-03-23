import Card from "../Auth/Users/Customer/Wallet/Card";
import Payment from "./Payment";
import { PaymentStatus } from "./PaymentStatus";

export default class CardPayment extends Payment {
  public pay(card: Card): void {
    card.subtractMoney(this.amount);
    this.status = PaymentStatus.Payed;
  }
}
