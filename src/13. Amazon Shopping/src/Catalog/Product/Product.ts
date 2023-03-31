import Category from "./Category";
import Customer from "../../Auth/Users/Customer/Customer";
import Review from "./Review";
import Rate from "./Rate";
import System from "../../System";

export default class Product {
  private name: string;
  private price: number;
  private quantity: number;
  private readonly reviews = new Set<Review>();
  private readonly rates = new Set<Rate>();

  public constructor(
    private readonly owner: Customer,
    name: string,
    price: number,
    quantity: number,
  ) {
    this.setName(name)
      .setPrice(price)
      .setQuantity(quantity)
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): this {
    this.name = name;
    return this;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): this {
    this.price = price;
    return this;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): this {
    if (quantity < 0) {
      throw new Error('Quantity must be a positive number');
    }

    this.quantity = quantity;
    return this;
  }

  public decrementQuantity(): this {
    if (this.quantity === 0) {
      throw new Error('Quantity already has its minimal value');
    }

    this.quantity--;
    return this;
  }

  public getOwner(): Customer {
    return this.owner;
  }

  public getReviews(): Review[] {
    return Array.from(this.reviews.values());
  }

  public createReview(author: Customer, text: string): Review {
    const review = new Review(this, author, text);
    this.reviews.add(review);

    return review;
  }

  public removeReview(review: Review): this {
    if (!this.reviews.has(review)) {
      throw new Error("Review can't be removed from not its own product");
    }

    this.reviews.delete(review);

    return this;
  }

  public getRates(): Rate[] {
    return Array.from(this.rates.values());
  }

  public getAverageRateValue(): number {
    const sum = this.getRates()
      .reduce(
        (sum, rate) => sum + rate.getValue(),
        0
      );
    const count = this.getRates().length;

    return Math.round(10 * sum / count) / 10;
  }

  public createRate(author: Customer, value: number): Rate {
    const existedAuthor = Array.from(this.rates).find(rate => rate.getAuthor() === author);

    if (existedAuthor) {
      throw new Error('This author already left rate');
    }

    const rate = new Rate(
      this,
      author,
      value
    )
    this.rates.add(rate);

    return rate;
  }

  public removeRate(rate: Rate): this {
    if (!this.rates.has(rate)) {
      throw new Error("Rate can't be removed from not its own product");
    }

    this.rates.delete(rate);

    return this;
  }

  public getCategory(): Category {
    return System.getInstance()
      .getCatalog()
      .getProductCategory(this);
  }

  public remove(): void {
    System.getInstance()
      .getCatalog()
      .removeProduct(this);
  }
}
