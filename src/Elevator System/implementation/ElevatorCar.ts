import ElevatorState from "./Enums/ElevatorState";
import ElevatorDisplay from "./Displays/ElevatorDisplay";
import ElevatorPanel from "./Panels/ElevatorPanel";
import Door from "./Door";
import Passenger from "./Passenger";
import Observable from "./Observer/Observable";
import ElevatorSystem from "./ElevatorSystem";

export default class ElevatorCar extends Observable {
  private readonly capacity = 680;
  private readonly SPEED = 100;
  private readonly door = new Door();
  public readonly display: ElevatorDisplay;
  public readonly panel: ElevatorPanel;
  private readonly passengers = new Set<Passenger>();

  private state: ElevatorState = ElevatorState.IDLE;
  private floorNum = 1;

  public constructor(
    private readonly system: ElevatorSystem,
  ) {
    super();
    this.display = new ElevatorDisplay(this.capacity);
    this.panel = new ElevatorPanel(this.system, this);

    this.onChange((floorNum: number, state: ElevatorState, occupancy: number) => {
      this.display.setFloorNum(floorNum);
      this.display.setCarState(state);
      this.display.setOccupancy(occupancy);
    });
  }

  public getState(): ElevatorState {
    return this.state;
  }

  public getFloorNum(): number {
    return this.floorNum;
  }

  public getOccupancy(): number {
    return Array.from(this.passengers.values())
      .reduce(
        (weight, passenger) => weight + passenger.getWeight(),
        0
      );
  }

  public isOverloaded(): boolean {
    return this.getOccupancy() > this.capacity;
  }

  public isOpened(): boolean {
    return this.door.isOpen();
  }

  public open(): this {
    if (this.state !== ElevatorState.IDLE) {
      throw new Error('ElevatorCar is moving.');
    }

    this.door.open();
    return this;
  }

  public close(): this {
    if (this.isOverloaded()) {
      throw new Error("ElevatorCar is overloaded. Door can't be closed.");
    }

    this.door.close();

    return this;
  }

  public stop(): this {
    this.state = ElevatorState.IDLE;
    this.notify();
    return this;
  }

  public upload(passenger: Passenger): this {
    if (!this.door.isOpen()) {
      throw new Error("Door is not opened. Passenger can't be uploaded.");
    }

    this.passengers.add(passenger);
    this.notify();
    return this;
  }

  public unload(passenger: Passenger): this {
    if (!this.door.isOpen()) {
      throw new Error("Door is not opened. Passenger can't be unloaded.");
    }

    this.passengers.delete(passenger);
    this.notify();

    return this;
  }

  public move(floorNum: number): Promise<ElevatorCar> {
    if (this.state !== ElevatorState.IDLE) {
      throw new Error('ElevatorCar is already moving.');
    }

    if (this.door.isOpen()) {
      throw new Error("Door is opened. ElevatorCar can't move.");
    }

    let step = 1;
    let carState = ElevatorState.UP;

    if (floorNum < this.floorNum) {
      step = -1;
      carState = ElevatorState.DOWN;
    }
    this.state = carState;
    this.notify();

    return new Promise<ElevatorCar>((resolve) => {
      const interval = setInterval(
        () => {
          if (this.floorNum === floorNum) {
            clearInterval(interval);
            resolve(this);
            return;
          }

          this.floorNum += step;
          this.notify();
        },
        this.SPEED,
      );
    })
      .then(car => car.stop())
      .then(car => car.open());
  }

  protected notify(): void {
    for (const handler of this.changeHandlers) {
      handler(this.floorNum, this.state, this.getOccupancy());
    }
  }
}
