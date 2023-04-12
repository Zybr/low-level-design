import User from "../User";
import Deposit from "./Deposit/Deposit";
import Watchlist from "./Watchlist";
import Portfolio from "./Portfolio";
import System from "../../../System";
import Stock from "../../../Market/Inventory/Stock";
import Order from "../../../Market/StockExhange/Orders/Order";
import OrderBuilder from "../../../Market/StockExhange/OrderBuilder";

export default class Member extends User {
  private readonly deposit = new Deposit(this);
  private readonly watchlist = new Watchlist();
  private readonly portfolio = new Portfolio();

  public constructor(username: string, password: string) {
    super(username, password);
    const inventory = System.getInstance()
      .getInventory();
    inventory.addDeletingObserver(this.watchlist)
    inventory.addDeletingObserver(this.portfolio)
  }

  public getDeposit(): Deposit {
    return this.deposit;
  }

  public getWatchlist(): Watchlist {
    return this.watchlist;
  }

  public getPortfolio(): Portfolio {
    return this.portfolio;
  }

  public getOrders(): Order[] {
    return System.getInstance()
      .getExchange()
      .getMemberOrders(this);
  }

  public placeOrder(stock: Stock, quantity: number, type): OrderBuilder {
    return System.getInstance()
      .getExchange()
      .buildOrder(this, stock, quantity, type);
  }

  public cancelOrder(order: Order) {
    order.cancel();
  }
}
