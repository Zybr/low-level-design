import ElevatorSystem from "../src/ElevatorSystem";
import Building from "../src/Building";
import ElevatorCar from "../src/ElevatorCar";
import ElevatorState from "../src/Enums/ElevatorState";
import Passenger from "../src/Passenger";

describe('ElevatorSystem', () => {
  test('Call car', async () => {
    const system = new ElevatorSystem(new Building(10), 2);
    const srcFloorNum = 5;
    const floor = system.building.floors[srcFloorNum];
    const carStates = [];

    floor.displays[0].onChange((...args) => carStates.push(args));
    const car = await floor.panels[0].upBtn.press();
    expect(car).toBeInstanceOf(ElevatorCar);
    expect(car.getFloorNum()).toEqual(srcFloorNum);
    expect(car.isOpened()).toBeTruthy();
    expect(carStates).toEqual([
      [1, ElevatorState.IDLE],
      [1, ElevatorState.UP],
      [2, ElevatorState.UP],
      [3, ElevatorState.UP],
      [4, ElevatorState.UP],
      [5, ElevatorState.UP],
      [5, ElevatorState.IDLE],
    ]);
  });

  test('Raid car', async () => {
    const system = new ElevatorSystem(new Building(10), 2);
    const srcFloorNum = 5;
    const dstFloorNum = 8;
    const floor = system.building.floors[srcFloorNum];
    const carStates = [];
    const passenger = new Passenger(80);

    // Call car
    const car = await floor.panels[0].upBtn.press();
    expect(car.display.getOccupancy()).toEqual(0);
    // Go into car
    car.upload(passenger)
    expect(car.display.getOccupancy()).toEqual(passenger.getWeight())

    // Raid to target floor
    car.display.onChange((floorNum: number, state: ElevatorState) => carStates.push([floorNum, state]));
    await system.requestMove(car, dstFloorNum);
    expect(car.getFloorNum()).toEqual(dstFloorNum);
    expect(car.isOpened()).toBeTruthy();
    expect(carStates).toEqual([
      [5, ElevatorState.UP],
      [6, ElevatorState.UP],
      [7, ElevatorState.UP],
      [8, ElevatorState.UP],
      [8, ElevatorState.IDLE],
    ]);

    // Go out from car
    car.unload(passenger);
    expect(car.display.getOccupancy()).toEqual(0)
  })
});
