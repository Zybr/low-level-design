import DoorState from "./Enums/DoorState";

export default class Door {
  private state: DoorState = DoorState.CLOSE;

  public isOpen(): boolean {
    return this.state === DoorState.OPEN;
  }

  public open(): void {
    this.state = DoorState.OPEN;
  }

  public close(): void {
    this.state = DoorState.CLOSE;
  }
}
