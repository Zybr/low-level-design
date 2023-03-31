import Person from "../Person/Person";
import Table from "../Table/Table";
import Period from "./Period";
import Order from "./Order/Order";
import Bill from "./Order/Bill/Bill";

export default class Reservation {
  private readonly orders = new Set<Order>();
  private bill: Bill | null = null;
  private canceled = false;

  public constructor(
    private readonly person: Person,
    private table: Table,
    private period: Period,
  ) {
  }

  public getPerson(): Person {
    return this.person;
  }

  public getTable(): Table {
    return this.table;
  }

  public setTable(table: Table): void {
    this.table = table;
  }

  public getPeriod(): Period {
    return this.period;
  }

  public setPeriod(period: Period) {
    this.period = period;
  }

  public getOrders(): Order[] {
    return Array.from(this.orders);
  }

  public addOrder(order: Order): void {
    if (!this.isActive()) {
      throw new Error('Reservation status is not Active');
    }

    this.orders.add(order);
  }

  public getCost(): number {
    return this.getOrders()
      .reduce(
        (sum, order) => sum + order.getCost(),
        0
      );
  }

  public cancel(): void {
    if (!this.isPending()) {
      throw new Error('Reservation status is not Pending');
    }

    this.canceled = true;
  }

  public isPending(): boolean {
    return !this.period.isStarted();
  }

  public isActive(): boolean {
    return this.period.isGoing() && !this.isDone();
  }

  public isDone(): boolean {
    return this.period.isEnded() || this.bill?.isPayed();
  }

  public isBilled(): boolean {
    return this.bill && !this.bill.isPayed();
  }

  public isCanceled(): boolean {
    return this.canceled;
  }

  public makeBill(): Bill {
    if (!this.isActive()) {
      throw new Error('Reservation status is not Active');
    }

    return this.bill = new Bill(this.getCost());
  }
}
