export default class Product {
  private static currentId = 0;

  private constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly price: number,
  ) {
  }

  public static create(
    name: string,
    price: number,
  ): Product {
    return new Product(
      ++this.currentId,
      name,
      price
    )
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public clone(): Product {
    return new Product(
      this.id,
      this.name,
      this.price
    )
  }
}
