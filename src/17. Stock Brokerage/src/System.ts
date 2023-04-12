import StockInventory from "./Market/Inventory/StockInventory";
import Authorization from "./Auth/Authorization";
import StockExchange from "./Market/StockExhange/StockExchange";

export default class System {
  private static instance: System | null;

  private readonly auth = new Authorization();
  private readonly inventory = new StockInventory();
  private readonly exchange = new StockExchange();

  private constructor() {
    this.inventory.addUpdatingObserver(this.exchange);
  }

  public static getInstance(): System {
    if (!System.instance) {
      System.instance = new System();
    }

    return System.instance;
  }

  public getAuth(): Authorization {
    return this.auth;
  }

  public getInventory(): StockInventory {
    return this.inventory;
  }

  public getExchange(): StockExchange {
    return this.exchange;
  }
}
