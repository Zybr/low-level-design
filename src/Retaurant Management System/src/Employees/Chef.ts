import Employee from "./Employee";
import Order from "../Reservation/Order/Order";
import Meal from "../Meal/Meals/Meal";

export default class Chef extends Employee {
  public cookOrder(order: Order): Meal[] {
    const storage = this.getBranch().getStorage();

    return order.getItems()
      .map(item => {
        storage.removeMeal(item.getMeal());
        return item.getMeal();
      })
  }
}
