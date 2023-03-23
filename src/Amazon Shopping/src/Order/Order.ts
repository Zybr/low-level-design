import Customer from "../Auth/Users/Customer/Customer";
import Item from "../Auth/Users/Customer/Cart/Item";
import Payment from "../Payments/Payment";
import { OrderStatus } from "./OrderStatus";
import Address from "../Auth/Users/Customer/Address";
import History from "./History/History";
import CardPayment from "../Payments/CardPayment";
import CashPayment from "../Payments/CashPayment";
import BankTransferPayment from "../Payments/BankTransferPayment";

export default class Order {
  private payment: Payment | null = null;
  private status: OrderStatus = OrderStatus.Pending;
  private readonly history = new History;
  private address: Address | null = null;

  public constructor(
    private readonly customer: Customer,
    private readonly items: Item[],
  ) {
    this.address = this.customer.getAddresses()[0] || null;
    this.history.created();
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getAddress(): Address | null {
    return this.address;
  }

  public setAddress(address: Address): void {
    this.address = address;
  }

  public getCost(): number {
    return Array.from(this.items.values()).reduce(
      (sum, item) => sum + item.getCost(),
      0
    );
  }

  public getItems(): Item[] {
    return this.items;
  }

  public getPayment(): Payment | null {
    return this.payment;
  }

  public getHistory(): History {
    return this.history;
  }

  // Read statuses >>

  public isPending(): boolean {
    return this.status === OrderStatus.Pending;
  }

  public isConfirmed(): boolean {
    return this.status === OrderStatus.Confirmed;
  }

  public isShipped(): boolean {
    return this.status === OrderStatus.Shipped;
  }

  public isComplete(): boolean {
    return this.status === OrderStatus.Complete;
  }

  public isCanceled(): boolean {
    return this.status === OrderStatus.Canceled;
  }

  public isPayed(): boolean {
    return !!this.payment;
  }

  // << Read statuses

  // Change statuses >>

  public confirm(payment?: CardPayment | BankTransferPayment): void {
    if (this.address) {
      throw new Error('To confirm order the destination address must be defined');
    }

    this.setStatus(OrderStatus.Confirmed);

    const card = this.customer.getWallet().getCard();

    if (
      !payment
      && card?.getMoney() >= this.getCost()
    ) {
      const payment = new CardPayment(this.getCost());
      payment.pay(card);
      this.setPayment(payment);
    }
  }

  public ship(): void {
    this.setStatus(OrderStatus.Shipped);
  }

  public deliver(): void {
    this.setStatus(OrderStatus.Delivering);
  }

  public complete(payment?: CashPayment): void {
    if (payment) {
      this.setPayment(payment);
    }

    if (!this.isPayed()) {
      throw new Error("Not payed order can't be completed");
    }
    this.setStatus(OrderStatus.Complete);
  }

  public cancel(): void {
    this.setStatus(OrderStatus.Canceled);

    if (this.payment) {
      this.customer
        .getWallet()
        .getCard()
        .addMoney(this.payment.getAmount());
      this.payment.refund();
    }
  }

  // << Change statuses

  private setStatus(status: OrderStatus) {
    switch (status) {
      case OrderStatus.Pending: {
        this.assertStatuses([]);
        this.history.created();
        break;
      }
      case OrderStatus.Confirmed: {
        this.assertStatuses([OrderStatus.Pending]);
        this.history.confirmed();
        break;
      }
      case OrderStatus.Shipped: {
        this.assertStatuses([OrderStatus.Confirmed]);
        this.history.shipped();
        break;
      }
      case OrderStatus.Delivering: {
        this.assertStatuses([OrderStatus.Shipped]);
        this.history.delivering();
        break;
      }
      case OrderStatus.Complete: {
        this.assertStatuses([OrderStatus.Delivering]);
        this.history.completed();
        break;
      }
      case OrderStatus.Canceled: {
        this.assertStatuses([OrderStatus.Pending, OrderStatus.Confirmed]);
        this.history.cancel();
        break;
      }
    }

    this.customer.notify(`Order status: ${status.toString()}`);
    this.status = status;
  }


  private setPayment(payment: Payment): void {
    if (this.isPayed()) {
      throw new Error('Order is already payed');
    }

    this.payment = payment;
  }

  private assertStatuses(statuses: OrderStatus[]): void {
    if (!statuses.length) {
      throw new Error("Status can't be changed to");
    }

    if (!statuses.includes(this.status)) {
      throw new Error(`Status must be ${statuses.join('/')} to be changed`);
    }
  }
}
