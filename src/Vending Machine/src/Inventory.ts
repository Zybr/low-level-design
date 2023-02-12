import Account from "./Account";
import Rack from "./Rack";
import Product from "./Product";

export default class Inventory {
  public constructor(
    private readonly account: Account,
    private readonly racks: Rack[],
  ) {
  }

  public getAccount(): Account {
    return this.account;
  }

  public getRacks(): Rack[] {
    return this.racks;
  }

  public addProduct(product: Product): this {
    this
      .getRackByProductId(product.getId())
      .addProduct(product);

    return this;
  }

  public removeProduct(productId): Product {
    return this.getRackByProductId(productId)
      .removeProduct()
  }

  private getRackByProductId(productId: number): Rack {
    const rack = this.racks.find(rack => rack.getProductId() === productId);

    if (!rack) {
      throw new Error('Product rack is not defined');
    }

    return rack;
  }
}
