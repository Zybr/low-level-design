import Order from "./Order";

export default class Package {
  public constructor(
    private readonly order: Order,
  ) {
  }

  public getOrder(): Order {
    return this.order;
  }

  public getSize(): number {
    return this.order.getSize();
  }
}
