export default class Stock {
  public constructor(
    private name: string,
    private price: number,
  ) {
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price
  }

  public setPrice(price: number) {
    this.price = price;
  }
}
