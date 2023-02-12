import StateInterface from "./StateInterface";
import Product from "../Product";
import VendingMachine from "../VendingMachine";
import Rack from "../Rack";
import DispenseState from "./DispenseState";

export default class MoneyInsertedState implements StateInterface {
  private rack: Rack | null = null;
  private change: number = 0;

  public constructor(
    private readonly machine: VendingMachine,
    private money: number,
  ) {
  }

  public insertMoney(money: number): void {
    this.money += money;
  }

  public chooseRack(rackId: number): void {
    const rack = this.getRackById(rackId)

    if (rack.isEmpty()) {
      return;
    }

    this.rack = rack;

    if (this.rack.getPrice() > this.money) {
      this.change = this.money;
      this.money = 0;
      return;
    }

    this.machine.setState(
      new DispenseState(
        this.machine,
        this.money,
        this.rack
      )
    )
  }

  public getChange(): number {
    return this.change;
  }

  public getProduct(): Product | null {
    return null;
  }

  private getRackById(id: number): Rack {
    const rack = this.machine
      .getInventory()
      .getRacks()
      .find(rack => rack.getId() === id);

    if (!rack) {
      throw new Error(`Rack with ID "${id}" is not defined.`)
    }

    return rack;
  }
}
