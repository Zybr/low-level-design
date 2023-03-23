import Customer from "../../Auth/Users/Customer/Customer";
import Product from "./Product";

export default class Rate {
  private readonly createdAt = new Date();
  private value: number;
  private updatedAt: Date;

  public constructor(
    private readonly product: Product,
    private readonly author: Customer,
    value: number,
  ) {
    this.setValue(value);
  }

  public getAuthor(): Customer {
    return this.author;
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(value: number): void {
    if (value < 1 || 5 < value) {
      throw new Error('Rate value is an integer number between 1 and 5');
    }

    this.value = Math.round(value);
    this.updatedAt = new Date();
  }

  public remove(): void {
    this.product.removeRate(this);
  }
}
