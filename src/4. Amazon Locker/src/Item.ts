import { v4 as uuid } from 'uuid';

export default class Item {
  public readonly id = uuid();
  private quantity: number = 1;

  public constructor(
    private readonly size: number,
  ) {
  }

  public getSize(): number {
    return this.size;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(value: number): this {
    if (value < 1) {
      throw Error('Quantity must be more 0');
    }
    this.quantity = value;

    return this;
  }
}
