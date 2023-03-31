import Product from "../Storage/Product/Product";

export default abstract class Meal {
  public constructor(
    private readonly products: Product[],
  ) {
  }

  public getProducts(): Product[] {
    return this.products;
  }
}
