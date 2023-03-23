import User from "./User";
import Order from "../../Order/Order";
import CashPayment from "../../Payments/CashPayment";

export default class Deliverer extends User {
  public deliver(order: Order) {
    order.deliver();
    const customer = order.getCustomer();
    let payment: CashPayment | null = null

    if (!order.isPayed()) {
      payment = new CashPayment(order.getCost());
      payment.pay(customer.getWallet());
    }

    order.complete(payment);
    customer.pushOrder(order);
  }
}
