import AbstractButton from "./AbstractButton";
import Direction from "../Enums/Direction";
import ElevatorSystem from "../ElevatorSystem";
import ElevatorCar from "../ElevatorCar";

export default class HallButton extends AbstractButton {
  private disabled: boolean;

  public constructor(
    private readonly system: ElevatorSystem,
    private readonly floorNum: number,
    private readonly direction: Direction,
  ) {
    super();
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public press(): Promise<ElevatorCar> {
    if (
      this.isPressed()
      || this.isDisabled()
    ) {
      return;
    }

    super.press();

    return this.system
      .requestCar(this.floorNum)
      .then(car => {
        this.unpress();
        return car;
      });
  }
}
