import ElevatorCar from "./ElevatorCar";
import ElevatorState from "./Enums/ElevatorState";
import Building from "./Building";
import HallDisplay from "./Displays/HallDisplay";
import Floor from "./Floor";
import HallPanel from "./Panels/HallPanel";

interface IsReady {
  (): boolean
}

/** TODO: Consider different strategies of cars dispatching */
export default class ElevatorSystem {
  private readonly cars: ElevatorCar[] = [];
  private readonly MAX_CARS_COUNT = 3;

  public constructor(
    public readonly building: Building,
    private readonly elevatorsCount: number,
  ) {
    if (elevatorsCount > this.MAX_CARS_COUNT) {
      throw new Error(`Max allowed number of elevators is ${this.MAX_CARS_COUNT}`);
    }

    for (let i = 0; i < elevatorsCount; i++) {
      const car = new ElevatorCar(this);
      this.cars.push(car);

      for (let floorNum = 1; floorNum < this.building.floors.length; floorNum++) {
        const floor = this.building.floors[floorNum];
        const hallDisplay = new HallDisplay();

        car.onChange((floorNum: number, state: ElevatorState) => {
          hallDisplay.setFloorNum(floorNum);
          hallDisplay.setCarState(state);
        });
        floor.addDisplay(hallDisplay);

        floor.addPanel(new HallPanel(this, floorNum));
      }
    }
  }

  public requestCar(floorNum: number): Promise<ElevatorCar> {
    return this.wait(() => this.getIdleCars().length !== 0)
      .then(() => this.getIdleCars())
      .then(cars => this.getClosestCar(cars, floorNum))
      .then(car => car.move(floorNum))
      .then(car => car.open())
  }

  public requestMove(car: ElevatorCar, floorNum: number): Promise<Floor> {
    return this.wait(() => car.getState() === ElevatorState.IDLE)
      .then(() => car.close())
      .then(() => car.move(floorNum))
      .then(car => car.open())
      .then(() => this.building.floors[floorNum])
  }

  private wait(isReady: IsReady): Promise<null> {
    return new Promise((resolve) => {
      const interval = setInterval(
        () => {
          if (isReady()) {
            clearInterval(interval);
            resolve(null);
          }
        },
        200
      );
    });
  }

  private getIdleCars(): ElevatorCar[] {
    return this.cars
      .filter(car => car.getState() === ElevatorState.IDLE);
  }

  private getClosestCar(cars: ElevatorCar[], floorNum): ElevatorCar | null {
    return cars.sort((carA, carB) => {
        const distA = Math.abs(carA.getFloorNum() - floorNum);
        const distB = Math.abs(carB.getFloorNum() - floorNum);
        return distA - distB;
      })[0]
      || null
  }
}
