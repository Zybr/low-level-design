import StateInterface from "./StateInterface";
import Product from "../Product";
import VendingMachine from "../VendingMachine";
import Rack from "../Rack";
import NoMoneyInsertedState from "./NoMoneyInsertedState";

export default class DispenseState implements StateInterface {
  private product: Product;
  private change: number;

  public constructor(
    private readonly machine: VendingMachine,
    private money: number,
    private readonly rack: Rack
  ) {
    this.product = rack.removeProduct();
    this.change = money - rack.getPrice();
  }

  public insertMoney(money: number): void {
    // Do nothing
  }

  public chooseRack(rackId: number): void {
    // Do nothing
  }

  public getChange(): number {
    const change = this.change;
    this.change = 0;

    if (this.isCleared()) {
      this.machine.setState(new NoMoneyInsertedState(this.machine));
    }

    return change;
  }

  public getProduct(): Product | null {
    const product = this.product;
    this.product = null;

    if (this.isCleared()) {
      this.machine.setState(new NoMoneyInsertedState(this.machine));
    }

    return product;
  }

  private isCleared(): boolean {
    return !this.product && !this.change;
  }
}
