export default abstract class Receipt {
  private readonly createdAt = new Date();

  public constructor(
    private readonly amount: number,
  ) {
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
