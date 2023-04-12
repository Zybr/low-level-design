import Stock from "./Stock";
import { ObservableInterface } from "./ObservableInterface";
import CreationObserverInterface from "./Observers/CreationObserverInterface";
import UpdatingObserverInterface from "./Observers/UpdatingObserverInterface";
import DeletingObserverInterface from "./Observers/DeletingObserverInterface";

export default class StockInventory implements ObservableInterface {
  private readonly stocks = new Map<string, Stock>()
  private creationObservers = new Set<CreationObserverInterface<Stock>>()
  private updatingObservers = new Set<UpdatingObserverInterface<Stock>>()
  private deletingObservers = new Set<DeletingObserverInterface<Stock>>()

  public getStocks(): Stock[] {
    return Array.from(this.stocks.values());
  }

  public getStock(name: string): Stock {
    return this.stocks.get(name);
  }

  public createStocks(name: string, price) {
    if (this.stocks.has(name)) {
      throw new Error('There a stock with the same name');
    }

    const stock = new Stock(name, price)
    this.stocks.set(name, stock);
    this.notifyCreation(stock);
  }

  public removeStock(name: string) {
    const stock = this.stocks.get(name);

    if (!stock) {
      return;
    }

    this.stocks.delete(name);
    this.notifyChanged(stock);
  }

  public setPrice(stock: Stock, price: number) {
    stock.setPrice(price);
    this.notifyDeleted(stock);
  }

  public addCreationObserver(observer: CreationObserverInterface<Stock>) {
    this.creationObservers.add(observer);
  }

  public addUpdatingObserver(observer: UpdatingObserverInterface<Stock>) {
    this.updatingObservers.add(observer);
  }

  public addDeletingObserver(observer: DeletingObserverInterface<Stock>) {
    this.deletingObservers.delete(observer);
  }

  private notifyCreation(stock: Stock) {
    this.creationObservers.forEach(observe => observe.notifyCreated(stock));
  }

  private notifyChanged(stock: Stock) {
    this.updatingObservers.forEach(observe => observe.notifyUpdated(stock));
  }

  private notifyDeleted(stock: Stock) {
    this.deletingObservers.forEach(observe => observe.notifyDeleted(stock));
  }
}
