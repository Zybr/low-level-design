import Locker from "./Locker";
import Location from "../Location";
import LockerSize from "./LockerSize";

export default class LockerLocation {
  private readonly lockers: Locker[] = [];

  public openTime: number = 0;
  public closeTime: number = 24;

  public constructor(
    private readonly location: Location
  ) {
  }

  public getLocation(): Location {
    return this.location;
  }

  public addLocker(size: LockerSize): Locker {
    const locker = new Locker(this.location, size)
    this.lockers.push(locker);

    return locker;
  }

  public getLockers(): Locker[] {
    return this.lockers.map(locker => locker);
  }
}
