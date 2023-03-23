import Product from "../../../../Catalog/Product/Product";
import Cart from "./Cart";

export default class Item {
  private quantity: number;

  public constructor(
    private readonly cart: Cart,
    private readonly product: Product,
    quantity: number,
  ) {
    this.setQuantity(quantity)
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public addQuantity(amount: number): void {
    this.setQuantity(this.getQuantity() + amount);
  }

  public setQuantity(quantity: number): void {
    if (quantity < 1) {
      throw new Error('Product quantity must be more 0');
    }
    if (quantity > this.product.getQuantity()) {
      throw new Error('There are not enough products');
    }

    this.quantity = quantity;
  }

  public getCost(): number {
    return this.getProduct().getPrice() * this.getQuantity();
  }

  public remove(): void {
    this.cart.removeItem(this);
  }
}
