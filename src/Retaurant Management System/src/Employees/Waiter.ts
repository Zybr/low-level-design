import Employee from "./Employee";
import Table from "../Table/Table";
import Item from "../Meal/Menu/Item";
import Order from "../Reservation/Order/Order";
import Bill from "../Reservation/Order/Bill/Bill";

export default class Waiter extends Employee {
  public makeOrder(table: Table, items: Item[]): void {
    const order = new Order(table, items);

    this.getBranch()
      .getReservations()
      .getTableActiveReservation(table)
      .addOrder(order);

    this.getBranch()
      .getChefs() [0]
      .cookOrder(order)
      .forEach(meal => table.addMeal(meal));
  }

  public getBill(table: Table): Bill {
    return this.getBranch()
      .getReservations()
      .getTableActiveReservation(table)
      .makeBill();
  }
}
