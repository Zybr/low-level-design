import HallPanel from "./Panels/HallPanel";
import HallDisplay from "./Displays/HallDisplay";

export default class Floor {
  public readonly displays: HallDisplay[] = [];
  public readonly panels: HallPanel[] = [];

  public constructor(
    private num: number
  ) {
  }

  public getNum(): number {
    return this.num;
  }

  public addDisplay(display: HallDisplay): void {
    this.displays.push(display);
  }

  public addPanel(panel: HallPanel): void {
    this.panels.push(panel);
  }
}
