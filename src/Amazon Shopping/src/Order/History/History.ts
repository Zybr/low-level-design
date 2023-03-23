import OrderLog from "./OrderLog";
import { OrderStatus } from "../OrderStatus";

export default class History {
  private readonly logs: OrderLog[] = [];

  public getLogs(): OrderLog[] {
    return this.logs;
  }

  public created(): void {
    this.createLog(OrderStatus.Pending);
  }

  public confirmed(): void {
    this.createLog(OrderStatus.Confirmed);
  }

  public shipped(): void {
    this.createLog(OrderStatus.Shipped);
  }

  public delivering(): void {
    this.createLog(OrderStatus.Delivering);
  }

  public completed(): void {
    this.createLog(OrderStatus.Complete);
  }

  public cancel(): void {
    this.createLog(OrderStatus.Canceled);
  }

  private createLog(status: OrderStatus): void {
    this.logs.push(new OrderLog(status));
  }
}
