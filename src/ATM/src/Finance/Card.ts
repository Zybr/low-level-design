export default class Card {
  public constructor(
    private readonly bankId: number,
    private readonly accountId: number,
  ) {
  }

  public getBankId(): number {
    return this.bankId;
  }

  public getAccountId(): number {
    return this.accountId;
  }
}
