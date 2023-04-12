import Order from "./Order";
import StockExchange from "../StockExchange";
import Member from "../../../Auth/Users/Member/Member";
import StockItem from "../../Inventory/StockItem";
import { OrderType } from "./Enums/OrderType";

export default class StopLossOrder extends Order {
  public constructor(
    owner: Member,
    item: StockItem,
    type: OrderType,
    private min: number,
  ) {
    super(
      owner,
      item,
      type
    );
  }

  public hasToBeProcessed(): boolean {
    return this.getMin() <= this.getItem().getStock().getPrice();
  }

  public getMin(): number {
    return this.min;
  }
}
