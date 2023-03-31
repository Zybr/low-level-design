import Customer from "../../Auth/Users/Customer/Customer";
import Product from "./Product";

export default class Review {
  private readonly createdAt = new Date();
  private text: string;
  private updatedAt: Date;

  public constructor(
    private readonly product: Product,
    private readonly author: Customer,
    text: string,
  ) {
    this.setText(text);
  }

  public getProduct(): Product {
    return this.product;
  }

  public getAuthor(): Customer {
    return this.author;
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    if (!text.trim().length) {
      throw new Error("Review text mustn't be empty");
    }

    this.text = text;
    this.updatedAt = new Date();
  }

  public remove(): void {
    this.product.removeReview(this);
  }
}
