import System from "../../../System";
import Stock from "../../../Market/Inventory/Stock";
import DeletingObserverInterface from "../../../Market/Inventory/Observers/DeletingObserverInterface";

export default class Watchlist implements DeletingObserverInterface<Stock> {
  private readonly stocks = new Set<Stock>();

  public addStock(stock: Stock) {
    this.stocks.add(stock);
  }

  public removeStock(stock: Stock) {
    this.stocks.delete(stock);
  }

  public getStockPries(): Map<string, number> {
    const inventory = System.getInstance()
      .getInventory()
    const prices = new Map<string, number>;

    Array.from(this.stocks)
      .map(stock => prices.set(stock.getName(), stock.getPrice()));

    return prices;
  }

  public notifyDeleted(data: Stock) {
    this.stocks.delete(data);
  }
}
