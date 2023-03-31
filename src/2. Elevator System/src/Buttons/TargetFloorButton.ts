import AbstractButton from "./AbstractButton";
import ElevatorSystem from "../ElevatorSystem";
import ElevatorCar from "../ElevatorCar";
import Floor from "../Floor";

export default class TargetFloorButton extends AbstractButton {
  public constructor(
    private readonly system: ElevatorSystem,
    private readonly car: ElevatorCar,
    private readonly dstFloorNum: number,
  ) {
    super();
  }

  public press(): Promise<Floor> {
    super.press();

    return this.system
      .requestMove(this.car, this.dstFloorNum)
      .then((floor) => {
        this.unpress();
        return floor;
      })
  }
}
