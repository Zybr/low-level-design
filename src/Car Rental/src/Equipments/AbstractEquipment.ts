export default abstract class AbstractEquipment {
  public constructor(
    private readonly price: number
  ) {
  }

  public getPrice(): number {
    return this.price;
  }
}
