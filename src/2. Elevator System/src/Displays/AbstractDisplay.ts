import Observable from "../Observer/Observable";
import ElevatorState from "../Enums/ElevatorState";

export default abstract class AbstractDisplay extends Observable {
  protected carState: ElevatorState = ElevatorState.IDLE;
  protected floorNum = 0;

  public constructor() {
    super();
  }

  public getFloorNum(): number {
    return this.floorNum;
  }

  public setFloorNum(floorNum: number): this {
    const prevFloorNum = this.floorNum;
    this.floorNum = floorNum;

    if (prevFloorNum !== this.floorNum) {
      this.notify();
    }

    return this;
  }

  public getCarState(): ElevatorState {
    return this.carState;
  }

  public setCarState(carState: ElevatorState): this {
    const prevState = this.carState;
    this.carState = carState;

    if (prevState !== carState) {
      this.notify();
    }

    return this;
  }
}
