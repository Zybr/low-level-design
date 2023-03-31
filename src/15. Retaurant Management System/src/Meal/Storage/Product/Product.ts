import { ProductType } from "./ProductType";

export default class Product {
  public constructor(
    private readonly type: ProductType,
    private weight: number = 0,
  ) {
  }

  public getType(): ProductType {
    return this.type;
  }

  public getWeight(): number {
    return this.weight;
  }

  public addWeight(weight: number): void {
    this.weight += weight;
  }

  public subWeight(weight: number): number {
    if (weight > this.weight) {
      throw new Error('There is not enough weight of product');
    }

    this.weight -= weight;

    return weight;
  }
}
