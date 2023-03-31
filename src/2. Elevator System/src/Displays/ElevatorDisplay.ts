import AbstractDisplay from "./AbstractDisplay";

export default class ElevatorDisplay extends AbstractDisplay {
  private occupancy: number = 0;

  public constructor(
    private readonly capacity: number,
  ) {
    super();
  }

  public setOccupancy(occupancy: number): this {
    this.occupancy = occupancy;

    return this;
  }

  public getOccupancy(): number {
    return this.occupancy;
  }

  protected notify(): void {
    for (const handler of this.changeHandlers) {
      handler(this.floorNum, this.carState, Math.round(this.occupancy / this.capacity));
    }
  }
}
