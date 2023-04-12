import Payment from "./Payments/Payment";
import DepositChangedNotification from "../../../../Notifications/DepositChangedNotification";
import Member from "../Member";

export default class Deposit {
  private amount: number = 0;

  public constructor(
    private readonly owner: Member
  ) {
  }

  public getAmount(): number {
    return this.amount;
  }

  public addMoney(amount: number) {
    this.amount += amount;

    new DepositChangedNotification(
      this.owner,
      amount,
      this.getAmount()
    );
  }

  public subMoney(amount: number) {
    if (amount > this.amount) {
      throw new Error('There is no enough money on the deposit');
    }

    this.amount -= amount;

    new DepositChangedNotification(
      this.owner,
      -amount,
      this.getAmount()
    );

    return amount;
  }

  public applyPayment(payment: Payment<any>) {
    if (!payment.isPayed()) {
      throw new Error('Payment is not payed');
    }

    this.addMoney(payment.getAmount());
  }

  public transferTo(deposit: Deposit, amount: number) {
    deposit.addMoney(this.subMoney(amount));
  }
}
