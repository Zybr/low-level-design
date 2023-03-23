import Product from "./Product";
import System from "../../System";

export default class Category {
  private readonly products = new Set<Product>()

  public constructor(
    private name: string,
  ) {
  }

  public getName(): string {
    return this.name;
  }

  public getProducts(): Product[] {
    return Array.from(this.products);
  }

  public addProduct(product: Product): void {
    this.products.add(product);
  }

  public removeProduct(product: Product): void {
    this.products.delete(product);
  }

  public remove(): void {
    System.getInstance()
      .getCatalog()
      .removeCategory(this);
  }
}
