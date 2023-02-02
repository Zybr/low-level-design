import HallButton from "../Buttons/HallButton";
import Direction from "../Enums/Direction";
import ElevatorSystem from "../ElevatorSystem";

export default class HallPanel {
  public readonly upBtn: HallButton | null = null;
  public readonly downBtn: HallButton | null = null;

  public constructor(
    private readonly system: ElevatorSystem,
    private readonly floorNum: number
  ) {
    this.upBtn = this.createUpButton();
    this.downBtn = this.createDownButton();
  }

  private createUpButton(): HallButton {
    const button = new HallButton(
      this.system,
      this.floorNum,
      Direction.UP
    );

    if (this.floorNum === this.system.building.floors.length - 1) {
      button.setDisabled(true);
    }

    return button;
  }

  private createDownButton(): HallButton {
    const button = new HallButton(
      this.system,
      this.floorNum,
      Direction.DOWN
    );

    if (this.floorNum === 1) {
      button.setDisabled(true);
    }

    return button;
  }
}
