import FloorButton from "../Buttons/TargetFloorButton";
import ElevatorSystem from "../ElevatorSystem";
import ElevatorCar from "../ElevatorCar";

export default class ElevatorPanel {
  public readonly floorButtons: FloorButton [] = [];

  public constructor(
    private readonly system: ElevatorSystem,
    private readonly car: ElevatorCar,
  ) {
    for (let floorNum = 1; floorNum <= system.building.floors.length; floorNum++) {
      this.addFloorButton(floorNum);
    }
  }

  private addFloorButton(floorNum: number) {
    this.floorButtons[floorNum] = new FloorButton(this.system, this.car, floorNum);
  }
}
