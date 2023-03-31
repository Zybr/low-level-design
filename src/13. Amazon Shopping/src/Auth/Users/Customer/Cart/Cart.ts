import Item from "./Item";
import Product from "../../../../Catalog/Product/Product";
import Order from "../../../../Order/Order";
import Customer from "../Customer";
import System from "../../../../System";

export default class Cart {
  private readonly items = new Map<Product, Item>();

  public constructor(
    private readonly customer: Customer,
  ) {
  }

  public getItems(): Item[] {
    return Array.from(this.items.values());
  }

  public addItem(product: Product, quantity: number): Item {
    if (this.items.has(product)) {
      this.items.get(product).addQuantity(quantity);
    } else {
      this.items.set(product, new Item(
        this,
        product,
        quantity
      ));
    }

    return this.items.get(product);
  }

  public removeItem(item: Item): void {
    this.items.delete(item.getProduct());
  }

  public getCost(): number {
    return Array.from(this.items.values()).reduce(
      (sum, item) => sum + item.getCost(),
      0
    );
  }

  public clear(): void {
    this.items.clear();
  }

  public order(): Order {
    const order = new Order(this.customer, this.getItems());
    this.clear();

    System.getInstance()
      .getOrders()
      .addOrder(order);

    return order;
  }
}
