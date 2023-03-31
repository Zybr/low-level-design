import { OrderStatus } from "../OrderStatus";

export default class OrderLog {
  private readonly createdAt = new Date();

  public constructor(
    private readonly status: OrderStatus
  ) {
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
