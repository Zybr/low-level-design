export default class Bounty {
  public constructor(
    private readonly rate: number,
  ) {
  }

  public getRate(): number {
    return this.rate;
  }
}
