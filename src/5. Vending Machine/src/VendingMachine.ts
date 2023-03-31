import Account from "./Account";
import Rack from "./Rack";
import Inventory from "./Inventory";
import StateInterface from "./States/StateInterface";
import Product from "./Product";
import NoMoneyInsertedState from "./States/NoMoneyInsertedState";

export default class VendingMachine {
  private state: StateInterface = new NoMoneyInsertedState(this);
  private readonly account = new Account();
  private readonly racks: Rack[] = [];
  private readonly inventory = new Inventory(this.account, this.racks);

  public addRack(product: Product): this {
    this.racks.push(
      new Rack(
        this.racks.length,
        product.getId()
      )
    );
    return this;
  }

  public getInventory(): Inventory {
    return this.inventory;
  }

  public setState(state: StateInterface): this {
    this.state = state;
    return this;
  }

  public insertMoney(money: number): this {
    this.state.insertMoney(money);
    return this;
  }

  public chooseRack(rockId: number): this {
    this.state.chooseRack(rockId);
    return this;
  }

  public getChange(): number {
    return this.state.getChange();
  }

  public getProduct(): Product | null {
    return this.state.getProduct()
  }
}
