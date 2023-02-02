export default class Passenger {
  public constructor(
    private readonly weight: number
  ) {
  }

  public getWeight(): number {
    return this.weight;
  }
}
