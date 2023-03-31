import Catalog from "./Catalog/Catalog";
import Authorization from "./Auth/Authoirization";
import OrdersCollection from "./Order/OrdersCollection";
import Deliverer from "./Auth/Users/Deliverer";

export default class System {
  private static instance = new System();
  private readonly authorization = new Authorization();
  private readonly catalog = new Catalog();
  private readonly ordersCollection = new OrdersCollection();
  private deliverers: Deliverer[] = [];

  public static getInstance(): System {
    return this.instance;
  }

  public getAuthorization(): Authorization {
    return this.authorization;
  }

  public getCatalog(): Catalog {
    return this.catalog;
  }

  public getOrders(): OrdersCollection {
    return this.ordersCollection;
  }

  public processOrders(): void {
    this.getOrders()
      .getConfirmedOrders()
      .forEach(order => order.ship());
    this.getOrders()
      .getShipped()
      .forEach(order => this.getNextDeliverer().deliver(order))
  }

  private getNextDeliverer(): Deliverer {
    this.deliverers = this.deliverers.length
      ? this.deliverers
      : this.getAuthorization().getDeliverers();
    return this.deliverers.pop();
  }
}
