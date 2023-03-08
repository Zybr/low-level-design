import Receipt from "./Receipt";

export default class TransferReceipt extends Receipt {
  public constructor(
    amount: number,
    private readonly receiverNumber: number,
  ) {
    super(amount);
  }

  public getReceiverNumber(): number {
    return this.receiverNumber;
  }
}
