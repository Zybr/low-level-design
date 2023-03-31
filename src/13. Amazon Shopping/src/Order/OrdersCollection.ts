import Order from "./Order";

export default class OrdersCollection {
  private readonly orders = new Set<Order>();

  public addOrder(order: Order): void {
    this.orders.add(order);
  }

  public getConfirmedOrders(): Order[] {
    return Array.from(this.orders).filter(order => order.isConfirmed());
  }

  public getShipped(): Order[] {
    return Array.from(this.orders).filter(order => order.isShipped());
  }
}
