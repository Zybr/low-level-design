import StateInterface from "./StateInterface";
import Product from "../Product";
import VendingMachine from "../VendingMachine";
import MoneyInsertedState from "./MoneyInsertedState";

export default class NoMoneyInsertedState implements StateInterface {
  public constructor(
    private readonly machine: VendingMachine,
  ) {
  }

  public insertMoney(money: number): void {
    this.machine.setState(
      new MoneyInsertedState(
        this.machine,
        money
      )
    )
  }

  public chooseRack(rackId: number): void {
    // Do nothing
  }

  public getChange(): number {
    return 0;
  }

  public getProduct(): Product | null {
    return null;
  }
}
