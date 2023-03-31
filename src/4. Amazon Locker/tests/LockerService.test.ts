import LockerService from "../src/LockerService";
import Customer from "../src/Customer";
import Item from "../src/Item";
import LockerSize from "../src/Locker/LockerSize";
import Location from "../src/Location";
import { faker } from "@faker-js/faker";
import LockerLocation from "../src/Locker/LockerLocation";
import Locker from "../src/Locker/Locker";

const makeLockerLocation = (service: LockerService): LockerLocation => {
  const lockerLocation = service.addLockerLocation(makeLocation());

  for (let i = 0; i < 10; i++) {
    makeLocker(lockerLocation)
  }

  return lockerLocation;
}

const makeLocation = (): Location => new Location(
  parseInt(faker.random.numeric(2)),
  parseInt(faker.random.numeric(2)),
);

const makeLocker = (location: LockerLocation): Locker => {
  const sizes = [
    LockerSize.EXTRA_SMALL,
    LockerSize.SMALL,
    LockerSize.MEDIUM,
    LockerSize.LARGE,
    LockerSize.EXTRA_LARGE,
    LockerSize.DOUBLE_EXTRA_LARGE,
  ]
  const inx = Math.floor(Math.random() * sizes.length);
  const size = sizes[inx];

  return location.addLocker(size)
}

const makeItem = (): Item => new Item(Math.floor(LockerSize.DOUBLE_EXTRA_LARGE * Math.random()))
  .setQuantity(Math.round(Math.random() * 3));

describe('LockerService', () => {
  let service = LockerService.getInstance();
  for (let i = 0; i < 10; i++) {
    makeLockerLocation(service);
  }

  test('make & pickup order', () => {
    const customer = new Customer();
    const itemA = makeItem();
    const itemB = makeItem();

    service.makeOrder(customer, makeLocation(), [itemA, itemB]);
    const order = customer.pickLastOrder();

    expect(order.getItems()).toHaveLength(2);
    expect(order.getSize()).toEqual(itemA.getSize() + itemB.getSize());
  });
});
