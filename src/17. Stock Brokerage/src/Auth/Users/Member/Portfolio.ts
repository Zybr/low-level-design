import Stock from "../../../Market/Inventory/Stock";
import StockItem from "../../../Market/Inventory/StockItem";
import DeletingObserverInterface from "../../../Market/Inventory/Observers/DeletingObserverInterface";

export default class Portfolio implements DeletingObserverInterface<Stock> {
  private items = new Map<Stock, StockItem>()

  public getItems(): StockItem[] {
    return Array.from(this.items.values());
  }

  public getItem(stock: Stock): StockItem {
    return this.items.get(stock);
  }

  public addItem(item: StockItem, quantity: number = null) {
    const stock = item.getStock()
    this.items.set(
      stock,
      this.items.get(stock)
      || new StockItem(stock, 0)
    );

    this.items.get(stock).addItem(item, quantity);
  }

  public subtractItem(item: StockItem, quantity: number = null) {
    this.items.get(item.getStock())
      .subtractItem(item, quantity);
  }

  public notifyDeleted(data: Stock) {
    this.items.delete(data);
    // TODO: Member loses his money invested into stock
  }
}
