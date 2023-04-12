import Member from "../../Auth/Users/Member/Member";
import Stock from "../Inventory/Stock";
import LimitOrder from "./Orders/LimitOrder";
import StockItem from "../Inventory/StockItem";
import { OrderType } from "./Orders/Enums/OrderType";
import StopLimitOrder from "./Orders/StopLimitOrder";
import MarketOrder from "./Orders/MarketOrder";
import StopLossOrder from "./Orders/StopLossOrder";
import System from "../../System";
import Order from "./Orders/Order";

export default class OrderBuilder {
  public constructor(
    private readonly owner: Member | null,
    private readonly stock: Stock | null,
    private readonly quantity: number | null,
    private readonly type: OrderType,
  ) {
  }

  public limitOrder(min: number, max: number): LimitOrder {
    return OrderBuilder.addOrderToExchange(
      new LimitOrder(
        this.owner,
        new StockItem(this.stock, this.quantity),
        this.type,
        min,
        max
      )
    );
  }

  public stopLimitOrder(min: number, max: number): StopLimitOrder {
    return OrderBuilder.addOrderToExchange(
      new StopLimitOrder(
        this.owner,
        new StockItem(this.stock, this.quantity),
        this.type,
        min,
        max
      )
    );
  }

  public marketOrder(): MarketOrder {
    return OrderBuilder.addOrderToExchange(
      new MarketOrder(
        this.owner,
        new StockItem(this.stock, this.quantity),
        this.type
      )
    );
  }

  public stopLossOrder(min: number): StopLossOrder {
    return OrderBuilder.addOrderToExchange(
      new StopLossOrder(
        this.owner,
        new StockItem(this.stock, this.quantity),
        this.type,
        min,
      )
    );
  }

  private static addOrderToExchange<T extends Order>(order: T): T {
    System.getInstance()
      .getExchange()
      .addOrder(order);

    return order;
  }
}
