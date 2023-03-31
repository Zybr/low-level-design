export default class Payment {
  public constructor(
    private readonly _days: number,
    private readonly _amount: number,
  ) {
  }

  get days(): number {
    return this._days;
  }

  get amount(): number {
    return this._amount;
  }
}
