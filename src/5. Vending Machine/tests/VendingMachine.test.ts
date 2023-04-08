import Operator from "../src/Operator";
import MachineFactory from "../src/MachineFactory";
import ProductsRepository from "../src/ProductsRepository";
import { faker } from "@faker-js/faker";
import Product from "../src/Product";

const productsList = ProductsRepository.getInstance();
const randomInt = (max: number, min: number = 0): number => Math.floor(min + Math.random() * (max - min));

describe('VendingMachine', () => {
  for (let i = 0; i < 5; i++) {
    productsList
      .createProduct(
        faker.word.noun(),
        randomInt(9, 1),
      )
  }

  const machine = MachineFactory
    .createMachine(productsList.getProducts());

  new Operator().fillMachine(machine);

  test('Buy product', () => {
    const targetProduct = productsList.getProducts()[0];
    const targetRack = machine
      .getInventory()
      .getRacks()
      .find(rack => rack.getProductId() === targetProduct.getId());

    // Not-money-inserted sate
    expect(machine.getProduct()).toBeNull()
    expect(machine.getChange()).toEqual(0)

    // Money-inserted state
    machine.insertMoney(targetProduct.getPrice() - 1)
    expect(machine.getProduct()).toBeNull()
    expect(machine.getChange()).toEqual(0)

    // Add money
    machine.insertMoney(3)
    expect(machine.getProduct()).toBeNull()
    expect(machine.getChange()).toEqual(0)

    // Dispense state
    machine.chooseRack(targetRack.getId())
    const product = machine.getProduct();

    expect(product).toBeInstanceOf(Product)
    expect(product.getId()).toEqual(targetProduct.getId())
    expect(machine.getChange()).toEqual(2);
  });

  test('Not money enough', () => {
    const targetProduct = productsList.getProducts()[0];
    const targetRack = machine
      .getInventory()
      .getRacks()
      .find(rack => rack.getProductId() === targetProduct.getId());

    // Money-inserted state
    machine.insertMoney(targetProduct.getPrice() - 1)
    expect(machine.getProduct()).toBeNull()
    expect(machine.getChange()).toEqual(0)

    machine.chooseRack(targetRack.getId());
    expect(machine.getProduct()).toBeNull()
    expect(machine.getChange()).toEqual(targetProduct.getPrice() - 1)
  });
});
