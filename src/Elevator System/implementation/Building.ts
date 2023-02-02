import Floor from "./Floor";

export default class Building {
  private readonly MAX_FLOORS_COUNT = 15;
  public floors: Floor[] = [];

  public constructor(floorsCount: number) {
    if (floorsCount > this.MAX_FLOORS_COUNT) {
      throw new Error(`Max allowed number of floors is ${this.MAX_FLOORS_COUNT}`);
    }

    for (let i = 1; i <= floorsCount; i++) {
      this.floors[i] = new Floor(i);
    }
  }
}
