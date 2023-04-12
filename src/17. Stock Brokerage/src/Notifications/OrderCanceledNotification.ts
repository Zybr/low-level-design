import Notification from "./Notification";
import Order from "../Market/StockExhange/Orders/Order";
import Member from "../Auth/Users/Member/Member";

export default class OrderCanceledNotification extends Notification {
  public constructor(
    receiver: Member,
    private readonly order: Order
  ) {
    super(receiver);
  }

  public getOrder(): Order {
    return this.order;
  }
}
