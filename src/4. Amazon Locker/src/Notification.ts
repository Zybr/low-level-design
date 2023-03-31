import Customer from "./Customer";
import Order from "./Order";
import Locker from "./Locker/Locker";

export default class Notification {
  public constructor(
    private readonly customer: Customer,
    private readonly order: Order,
    private readonly locker: Locker,
    private readonly code: string,
  ) {
  }

  public send(): void {
    this.customer.notify(this);
  }

  public getItemsIds(): string[] {
    return this.order.getItems().map(item => item.id);
  }

  public getLocker(): Locker {
    return this.locker;
  }

  public getCode(): string {
    return this.code;
  }
}
