import Order from "./Orders/Order";
import Member from "../../Auth/Users/Member/Member";
import Stock from "../Inventory/Stock";
import OrderBuilder from "./OrderBuilder";
import UpdatingObserverInterface from "../Inventory/Observers/UpdatingObserverInterface";
import { OrderType } from "./Orders/Enums/OrderType";

export default class StockExchange implements UpdatingObserverInterface<Stock> {

  private readonly ownerOrders = new Map<Member, Set<Order>>()
  private readonly stockOrders = new Map<Stock, Set<Order>>()

  public getMemberOrders(member: Member): Order[] {
    return Array.from(this.ownerOrders.get(member)?.values() || []);
  }

  public getStockOrder(stock: Stock): Order[] {
    return Array.from(this.stockOrders.get(stock)?.values() || [])
  }

  public buildOrder(owner: Member, stock: Stock, quantity: number, type: OrderType): OrderBuilder {
    return new OrderBuilder(owner, stock, quantity, type);
  }

  public addOrder(order: Order) {
    const owner = order.getOwner();
    const stock = order.getItem().getStock();

    this.ownerOrders.set(owner, this.ownerOrders.get(owner) || new Set<Order>);
    this.ownerOrders.get(owner).add(order);

    this.stockOrders.set(stock, this.stockOrders.get(stock) || new Set<Order>);
    this.stockOrders.get(stock).add(order);

    this.notifyUpdated(order.getItem().getStock());
  }

  public removeOrder(order: Order) {
    const owner = order.getOwner();
    const stock = order.getItem().getStock();

    this.ownerOrders.get(owner).delete(order);
    this.stockOrders.get(stock).delete(order);
  }

  public notifyUpdated(stock: Stock) {
    Array.from(this.stockOrders.get(stock).values())
      .filter(order => order.isPending())
      .forEach(order => this.processOrder(order));
  }

  private processOrder(order: Order) {
    if (order.isCompleted()) { // Can be completed in role of resolvers
      return;
    }

    const resolvers = Array.from(this.stockOrders.get(order.getItem().getStock()).values())
      .filter(ord => ord.isPending() && ord.getType() !== order.getType());

    while (resolvers.length && !order.isCompleted()) {
      order.resolve(resolvers.pop());
    }
  }
}
