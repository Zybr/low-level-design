import AbstractDisplay from "./AbstractDisplay";

export default class HallDisplay extends AbstractDisplay {
  public onChange(handler): void {
    this.changeHandlers.push(handler);
  }

  protected notify(): void {
    for (const handler of this.changeHandlers) {
      handler(this.floorNum, this.carState);
    }
  }
}
