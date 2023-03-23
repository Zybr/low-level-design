import User from "../User";
import Address from "./Address";
import Wallet from "./Wallet/Wallet";
import Cart from "./Cart/Cart";
import System from "../../../System";
import Product from "../../../Catalog/Product/Product";
import Order from "../../../Order/Order";

export default class Customer extends User {
  private readonly addresses = new Set<Address>();
  private readonly wallet = new Wallet();
  private readonly cart = new Cart(this);
  private readonly deliveredOrders: Order[] = [];

  public addAddress(address: Address): void {
    this.addresses.add(address);
  }

  public getAddresses(): Address[] {
    return Array.from(this.addresses);
  }

  public getWallet(): Wallet {
    return this.wallet;
  }

  public getCart(): Cart {
    return this.cart;
  }

  public createProduct(
    name: string,
    quantity: number,
    price: number,
  ): Product {
    return System.getInstance()
      .getCatalog()
      .createProduct(
        this,
        name,
        price,
        quantity
      );
  }

  public removeProduct(product: Product): void {
    product.remove();
  }

  public createReview(product: Product, text: string): void {
    product.createReview(this, text);
  }

  public createRate(product: Product, value: number): void {
    product.createRate(this, value);
  }

  public pushOrder(order: Order): void {
    this.deliveredOrders.push(order);
  }

  public getDeliveredOrders(): Order[] {
    return this.deliveredOrders;
  }
}
