import Order from "./Order";
import Member from "../../../Auth/Users/Member/Member";
import StockItem from "../../Inventory/StockItem";
import { OrderType } from "./Enums/OrderType";

export default class StopLimitOrder extends Order {
  public constructor(
    owner: Member,
    item: StockItem,
    type: OrderType,
    private min: number,
    private max: number,
  ) {
    super(
      owner,
      item,
      type
    );
  }

  public hasToBeProcessed(): boolean {
    const stockPrice = this.getItem().getStock().getPrice();
    return this.getMin() <= stockPrice && stockPrice <= this.getMax();
  }

  public getMin(): number {
    return this.min;
  }

  public getMax(): number {
    return this.max;
  }
}
