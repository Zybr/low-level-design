export default abstract class AbstractService {
  public constructor(
    private readonly price: number
  ) {
  }

  public getPrice(): number {
    return this.price
  }
}
