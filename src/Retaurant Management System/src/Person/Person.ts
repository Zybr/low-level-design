import Phone from "./Phone";
import Wallet from "./Wallet/Wallet";
import Branch from "../Branch";
import Period from "../Reservation/Period";
import Table from "../Table/Table";
import { makeLibrarian } from "../../../Library Management/tests/utils";
import Item from "../Meal/Menu/Item";
import CardPayment from "../Reservation/Order/Bill/Payment/CardPayment";

export default class Person {
  private readonly wallet = new Wallet();
  private readonly phone: Phone;
  private reservedBranch: Branch | null = null;

  public constructor(
    private readonly name: string,
    phoneNumber: string,
  ) {
    this.phone = new Phone(phoneNumber);
  }

  public getName(): string {
    return this.name;
  }

  public getPhone(): Phone {
    return this.phone;
  }

  public getWallet(): Wallet {
    return this.wallet;
  }

  public reserveTable(branch: Branch, period: Period, table?: Table): void {
    branch.getReceptionists()[0]
      .reserve(this, period, table)
    this.reservedBranch = branch;
  }

  public takeTable(): void {
    this.getTable()
      .getSeats()[0]
      .take(this);
  }

  public makeOrder(items: Item[]): void {
    this.reservedBranch
      .getWaiters()[0]
      .makeOrder(
        this.getTable(),
        items
      );
  }

  public freeTable(): void {
    const bill = this.reservedBranch
      .getWaiters()[0]
      .getBill(this.getTable());

    this.getTable()
      .getSeats()
      .forEach(seat => seat.free());

    const payment = new CardPayment(bill.getAmount());
    payment.pay(this.getWallet().getCards()[0]);
    bill.pay(payment);

    this.reservedBranch = null;
  }

  private getTable(): Table {
    return this.reservedBranch
      .getReceptionists()[0]
      .getActiveTable(this)
  }
}
