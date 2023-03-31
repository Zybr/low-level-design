import Location from "./Location";
import LockerLocation from "./Locker/LockerLocation";
import Item from "./Item";
import Order from "./Order";
import Locker from "./Locker/Locker";
import Package from "./Package";
import Notification from "./Notification";
import Customer from "./Customer";

export default class LockerService {
  private readonly locations: LockerLocation[] = []
  private static instance: LockerService;

  private constructor() {
  }

  public static getInstance(): LockerService {
    if (!LockerService.instance) {
      LockerService.instance = new LockerService();
    }

    return LockerService.instance;
  }

  public addLockerLocation(location: Location): LockerLocation {
    const lockerLocation = new LockerLocation(location);
    this.locations.push(lockerLocation);

    return lockerLocation;
  }

  public makeOrder(customer: Customer, location: Location, items: Item[]): void {
    const order = new Order(items, location);
    const code = this.generateCode();

    const locker = this
      .defineLock(location, order.getSize()) // Find closest with appropriate size
      .book(code) // Book locker
      .addPackage(new Package(order)); // Deliver package to locker
    (new Notification(customer, order, locker, code)) // Inform user
      .send()
  }

  private defineLock(location: Location, size: number): Locker {
    const locations = this.locations
      .map(lockerLoc => lockerLoc)
      .sort(
        (lockerLocA, lockerLocB) =>
          this.getDistance(location, lockerLocA.getLocation())
          - this.getDistance(location, lockerLocB.getLocation())
      );

    for (const location of locations) {
      const locker = location
        .getLockers()
        .sort((lockerA, lockerB) => lockerA.getSize() - lockerB.getSize())
        .find(locker => locker.isAvailable() && locker.getSize() >= size);

      if (locker) {
        return locker;
      }
    }

    throw new Error('Free lock is not defined');
  }

  private generateCode(): string {
    const generateDigit = () => Math.floor(Math.random() * 10);
    let code = '';

    for (let i = 0; i < 4; i++) {
      code += generateDigit();
    }

    return code;
  }

  private getDistance(locationA: Location, locationB: Location): number {
    const widthA = Math.abs(locationA.latitude - locationB.latitude);
    const heightA = Math.abs(locationA.longitude - locationB.longitude);
    return Math.sqrt(widthA * widthA + heightA * heightA);
  }
}
