import Card from "../../../../Person/Wallet/Card";
import Payment from "./Payment";
import { PaymentStatus } from "./PaymentStatus";

export default class CardPayment extends Payment {
  public pay(card: Card): void {
    card.subtractAmount(this.amount);
    this.status = PaymentStatus.Payed;
  }
}
