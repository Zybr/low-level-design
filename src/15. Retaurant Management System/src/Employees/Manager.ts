import Employee from "./Employee";
import Table from "../Table/Table";
import Seat from "../Table/Seat";
import Meal from "../Meal/Meals/Meal";
import Product from "../Meal/Storage/Product/Product";
import { ProductType } from "../Meal/Storage/Product/ProductType";
import Person from "../Person/Person";
import Receptionist from "./Receptionist";
import Waiter from "./Waiter";
import Chef from "./Chef";

export default class Manager extends Employee {
  public addTable(setsNum: number): void {
    const table = new Table();
    while (setsNum--) {
      table.addSeat(new Seat());
    }

    this.getBranch()
      .getTables()
      .addTable(table)
  }

  public addMenuItem(sectionName, meal: Meal, price: number): void {
    const menu = this.getBranch().getMenu();

    if (!menu.hasSection(sectionName)) {
      menu.addSection(sectionName);
    }

    menu.getSection(sectionName)
      .addItem(meal, price);
  }

  public supplyProduct(type: ProductType, weight: number): void {
    this.getBranch()
      .getStorage()
      .addProduct(new Product(type, weight));
  }

  public createManager(person: Person): void {
    this.getBranch()
      .addManager(new Manager(person, this.getBranch()));
  }

  public createReceptionist(person: Person): void {
    this.getBranch()
      .addReceptionist(new Receptionist(person, this.getBranch()));
  }

  public createWaiter(person: Person): void {
    this.getBranch()
      .addWaiter(new Waiter(person, this.getBranch()));
  }

  public createChef(person: Person): void {
    this.getBranch()
      .addChef(new Chef(person, this.getBranch()));
  }
}
