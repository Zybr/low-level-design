import VendingMachine from "./VendingMachine";
import Product from "./Product";

export default class MachineFactory {
  public static createMachine(products: Product[]): VendingMachine {
    const machine = new VendingMachine();
    products.forEach(product => machine.addRack(product));

    return machine;
  }
}
