import Product from "./Product";

export default class Rack {
  private readonly products: Product[] = []

  public constructor(
    private readonly id: number,
    private productId: number,
  ) {
  }

  public getId(): number {
    return this.id;
  }

  public getProductId(): number {
    return this.productId;
  }

  public getPrice(): number {
    if (this.isEmpty()) {
      throw new Error('Rack is empty');
    }

    return this.products[0].getPrice();
  }

  public addProduct(product: Product) {
    if (product.getId() !== this.productId) {
      throw new Error('Invalid product type');
    }

    this.products.push(product);
  }

  public removeProduct(): Product {
    if (this.isEmpty()) {
      throw new Error('Rack is empty');
    }

    return this.products.pop();
  }

  public getSize(): number {
    return this.products.length;
  }

  public isEmpty(): boolean {
    return this.getSize() === 0;
  }
}
