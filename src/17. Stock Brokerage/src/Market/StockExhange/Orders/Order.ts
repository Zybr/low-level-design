import Member from "../../../Auth/Users/Member/Member";
import StockItem from "../../Inventory/StockItem";
import { OrderStatus } from "./Enums/OrderStatus";
import OrderCanceledNotification from "../../../Notifications/OrderCanceledNotification";
import { OrderType } from "./Enums/OrderType";
import OrderCompleteNotification from "../../../Notifications/OrderCompleteNotification";

export default abstract class Order {
  private status: OrderStatus = OrderStatus.Pending;
  private readonly targetQuantity: number;

  public constructor(
    private readonly owner: Member,
    private readonly item: StockItem,
    private readonly type: OrderType,
  ) {
    if (type === OrderType.Buy) {
      this.targetQuantity = item.getQuantity();
      item.subtract(item.getQuantity());
    } else {
      this.targetQuantity = 0;
    }
  }

  public getOwner(): Member {
    return this.owner;
  }

  public getItem(): StockItem {
    return this.item;
  }

  public getType(): OrderType {
    return this.type;
  }

  public cancel() {
    this.assertStatus(OrderStatus.Pending);
    this.status = OrderStatus.Canceled;
    new OrderCanceledNotification(this.owner, this);
  }

  public resolve(order: Order) {
    this.assertStatus(OrderStatus.Pending);
    this.assertOppositeOrderType(order);
    this.assertTheSameStock(order);

    const cost = this.getDiffQuantity(order) * this.getItem().getStock().getPrice();

    if (this.getType() === OrderType.Buy) { // Buy
      this.transferMoney(this, order, cost)
      this.transferItem(order, this);
    } else { // Sell
      this.transferMoney(order, this, cost);
      this.transferItem(this, order);
    }

    if (this.isReached()) {
      this.complete();
    }

    if (order.isReached()) {
      order.complete();
    }
  }

  public abstract hasToBeProcessed(): boolean;

  public isReached(): boolean {
    return this.targetQuantity === this.getItem().getQuantity();
  }

  public isPending(): boolean {
    return this.status === OrderStatus.Pending;
  }

  public isCompleted(): boolean {
    return this.status === OrderStatus.Completed;
  }

  private complete() {
    this.status = OrderStatus.Completed;
    new OrderCompleteNotification(this.owner, this)
  }

  private assertStatus(status: OrderStatus) {
    if (this.status !== status) {
      throw new Error(`Status must be ${status}`);
    }
  }

  private assertOppositeOrderType(order: Order) {
    if (order.getType() === this.getType()) {
      throw new Error('Applying order must have opposite type');
    }
  }

  private assertTheSameStock(order: Order) {
    if (order.getItem().getStock() !== this.getItem().getStock()) {
      throw new Error('Applying order must have the same stock');
    }
  }

  private getDiffQuantity(order: Order): number {
    const selfQuantity = (this.targetQuantity - this.getItem().getQuantity());
    const orderQuantity = order.getItem().getQuantity();
    return  Math.min(selfQuantity, orderQuantity);
  }

  private transferItem(from: Order, to: Order) {
    const quantity = this.getDiffQuantity(from === this ? to : from);
    to.getItem().addItem(from.getItem(), quantity);

    to.getOwner().getPortfolio().addItem(
      from.getOwner().getPortfolio().getItem(
        to.getItem().getStock()
      ),
      quantity
    )
  }

  private transferMoney(from: Order, to: Order, cost: number) {
    from.getOwner()
      .getDeposit()
      .transferTo(
        to.getOwner().getDeposit(),
        cost
      );
  }
}

