import VendingMachine from "./VendingMachine";
import ProductsRepository from "./ProductsRepository";

export default class Operator {
  private readonly rackMaxSize = 10;

  public fillMachine(machine: VendingMachine): void {
    machine
      .getInventory()
      .getRacks()
      .forEach(
        rack => {
          const product = ProductsRepository
            .getInstance()
            .getProduct(rack.getProductId());

          while (rack.getSize() < this.rackMaxSize) {
            rack.addProduct(product.clone())
          }
        }
      )
  }
}
