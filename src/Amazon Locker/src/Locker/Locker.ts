import Location from "../Location";
import LockerSize from "./LockerSize";
import LockerPackage from "./LockerPackage";
import Package from "../Package";
import LockerState from "./LockerState";

export default class Locker {
  private state: LockerState = LockerState.AVAILABLE;
  private package: LockerPackage | null = null;
  private code: string;
  private readonly validDays = 3;

  public constructor(
    private readonly location: Location,
    private readonly size: LockerSize,
  ) {
  }

  public getSize(): LockerSize {
    return this.size;
  }

  public addPackage(pack: Package): this {
    if (!this.isBooked()) {
      throw new Error('Locker is not booked');
    }

    if (pack.getSize() > this.size) {
      throw new Error('Package is too big');
    }

    this.package = new LockerPackage(pack, this.code, this.validDays);
    this.close();

    return this;
  }

  public removePackage(code: string = null): Package {
    if (!this.isClosed()) {
      throw new Error('Locker is not closed')
    }

    if (
      code
      && !this.package.isValidCode(code)
    ) {
      throw new Error('Code is not valid')
    }

    const pack = this.package.getPackage();
    this.package = null;

    return pack;
  }

  public isBooked(): boolean {
    return this.state === LockerState.BOOKED;
  }

  public book(code): this {
    if (!this.isAvailable()) {
      throw new Error('Locker is not available')
    }

    this.code = code;
    this.state = LockerState.BOOKED;

    return this;
  }

  public isAvailable(): boolean {
    return this.state === LockerState.AVAILABLE;
  }

  public isClosed(): boolean {
    return this.state === LockerState.CLOSED;
  }

  public close(): this {
    if (!this.isBooked()) {
      throw new Error('Locker is not booked')
    }

    this.state = LockerState.CLOSED;

    return this;
  }
}
