export default class Room {
  public constructor(
    private readonly capacity: number,
  ) {
  }

  public getCapacity(): number {
    return this.capacity;
  }
}
