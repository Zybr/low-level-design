import Stock from "./Stock";

export default class StockItem {
  public constructor(
    private readonly stock: Stock,
    private quantity: number,
  ) {
  }

  public getStock(): Stock {
    return this.stock
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getCost(): number {
    return this.stock.getPrice() * this.getQuantity();
  }

  public add(quantity: number) {
    this.quantity += quantity;
  }

  public subtract(quantity: number) {
    this.assertHasAtLeast(quantity);
    this.quantity -= quantity;
  }

  public addItem(item: StockItem, quantity: number = null) {
    this.assertTheSameStock(item);
    this.add(quantity || item.getQuantity());
    item.subtract(quantity || item.getQuantity());
  }

  public subtractItem(item: StockItem, quantity: number = null) {
    this.assertTheSameStock(item);
    this.add(quantity || item.quantity);
    item.subtract(quantity || item.getQuantity());
  }

  private assertTheSameStock(item: StockItem) {
    if (this.getStock() !== item.getStock()) {
      throw new Error('Items must have the same stock');
    }
  }

  private assertHasAtLeast(quantity: number) {
    if (this.quantity < quantity) {
      throw new Error('There is not enough amount');
    }
  }
}
