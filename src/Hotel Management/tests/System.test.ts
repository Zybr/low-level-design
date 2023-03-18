import Hotel from "../src/Hotel/Hotel";
import { faker } from "@faker-js/faker";
import Address from "../src/Hotel/Address";
import Manager from "../src/Authorizatoin/Users/Servants/Manager";
import Receptionist from "../src/Authorizatoin/Users/Servants/Receptionist";
import Housekeeper from "../src/Authorizatoin/Users/Servants/Housekeeper";
import RoomType from "../src/Hotel/Room/RoomType";
import Room from "../src/Hotel/Room/Room";
import System from "../src/System";
import FoodServices from "../src/Services/FoodServices";
import AmenityService from "../src/Services/AmenityService";
import KitchenService from "../src/Services/KitchenService";
import RoomService from "../src/Services/RoomService";
import MasterKey from "../src/Keys/MasterKey";
import Service from "../src/Services/Service";
import Guest from "../src/Authorizatoin/Users/Guest";
import Booking from "../src/Booking";

const system = System.getInstance();
const roomsCountOfGroup = 5;
const roomPrices = {
  [RoomType.Standard]: 10,
  [RoomType.Deluxe]: 20,
  [RoomType.FamilySuite]: 30,
  [RoomType.BusinessSuite]: 40,
}
const servicePrices = {
  [AmenityService.name]: 1,
  [FoodServices.name]: 2,
  [KitchenService.name]: 3,
  [RoomService.name]: 4,
};
const guestBudget = 1000;

const makeHotel = (): Hotel => {
  return new Hotel(
    faker.company.name(),
    makeAddress()
  )
}

const makeManager = (hotel: Hotel) => {
  const manager = new Manager(
    faker.internet.userName(),
    faker.internet.password(),
    hotel
  );
  hotel.addManager(manager);

  return manager;
}

const makeReceptionist = (hotel: Hotel): Receptionist => {
  const manager = hotel.getManagers()[0];
  return manager.addReceptionist(
    faker.internet.userName(),
    faker.internet.password(),
    manager.getHotel()
  )
}

const makeHousekeeper = (hotel: Hotel): Housekeeper => {
  const manager = hotel.getManagers()[0];
  makeMasterKye(manager);
  return manager.addHousekeeper(
    faker.internet.userName(),
    faker.internet.password(),
    manager.getHotel()
  )
}

const makeGuest = (): Guest => {
  const username = faker.internet.userName();
  const password = faker.internet.password();
  const guest = system.getAuthorization()
    .createGuest(
      username,
      password
    )
  guest.addMoney(guestBudget);
  return system.getAuthorization()
    .login(username, password) as Guest;
}

const makeRooms = (hotel: Hotel): Room[] => {
  const manager = hotel.getManagers()[0];
  const rooms: Room[] = [];

  for (const key of Object.keys(roomPrices)) {
    const roomType = +key;
    System.getInstance()
      .getPriceList()
      .setRoomTypeCost(roomType, roomPrices[key]);
    for (let i = 0; i < roomsCountOfGroup; i++) {
      rooms.push(manager.createRoom(roomType));
    }
  }

  return rooms;
}

const makeServices = (): Service[] => {
  const services = [
    new AmenityService(),
    new FoodServices(),
    new KitchenService(),
    new RoomService(),
  ];

  for (const service of services) {
    system.addService(
      service,
      servicePrices[service.constructor.name]
    )
  }

  return services;
}

const makeAddress = (): Address => {
  return new Address(
    faker.address.country(),
    faker.address.state(),
    faker.address.streetAddress(),
    faker.address.zipCode(),
  )
}

const makeMasterKye = (manager: Manager): MasterKey => {
  const key = new MasterKey(manager.getHotel());
  manager.getHotel()
    .getKeyRack()
    .putKey(key);
  return key;
}

const makeHotelSystem = (): void => {
  const hotel = makeHotel();
  makeManager(hotel);
  makeHousekeeper(hotel);
  makeReceptionist(hotel);
  makeRooms(hotel);
  makeServices();
}

const book = (guest: Guest, days: number): Booking => {
  const hotel = system.getHotels()[0];
  const service = system.getServices()[0];

  const booking = guest.book(
    hotel,
    20,
    30,
    RoomType.Deluxe,
    makeDate(),
    makeDate(days),
  );
  booking.setServices([service]);
  guest.confirm(booking);

  return booking;
}

const makeDate = (plusDays = 0): Date => {
  const date = new Date();
  date.setTime(1000 * 60 * 60 * 24 * plusDays);
  return date;
}

describe('System', () => {
  beforeEach(() => makeHotelSystem());

  test('make hotel', () => {
    const priceList = system.getPriceList();

    const rooms = system.getCatalog().search();
    expect(rooms).toHaveLength(roomsCountOfGroup * Object.keys(roomPrices).length);
    const roomTypes = rooms.reduce(
      (types, room) => types.add(room.getType()),
      new Set<RoomType>()
    );
    expect(roomTypes.size).toEqual(4);

    expect(system.getServices()).toHaveLength(Object.keys(servicePrices).length);
    for (const serviceType of Object.keys(servicePrices)) {
      expect(priceList.getServiceTypeCost(serviceType)).toEqual(servicePrices[serviceType]);
    }

    for (const key of Object.keys(roomPrices)) {
      const roomType: RoomType = +key;
      expect(priceList.getRoomTypeCost(roomType)).toEqual(roomPrices[key]);
    }

    expect(rooms[0].getHotel().getManagers()).toHaveLength(1);
    expect(rooms[0].getHotel().getHousekeepers()).toHaveLength(1);
    expect(rooms[0].getHotel().getReceptionists()).toHaveLength(1);
  });

  test('book & cancel', () => {
    const guest = makeGuest();
    const days = 5;

    const booking = book(guest, days);

    // Book
    expect(system.getCurrentBooking(guest)).toBeDefined();
    const oneDayPrice =
      booking.getRoom()
        .getRate()
      + booking.getServices()
        .reduce(
          (sum, service) => sum + service.getRate(),
          0
        );
    expect(booking.getPrepaymentCost()).toEqual(oneDayPrice)
    expect(booking.getRestPaymentCost()).toEqual(oneDayPrice * (days - 1))
    expect(guest.getMoney()).toEqual(guestBudget - oneDayPrice);

    // Cancel
    guest.cancel();
    expect(system.getCurrentBooking(guest)).toBeNull();
    expect(guest.getMoney()).toEqual(guestBudget);
  });


  test('check-in', () => {
    const guest = makeGuest();
    const days = 5;
    const booking = book(guest, days);

    booking.getRoom().getHotel().getReceptionists()[0]
      .checkIn(guest);

    expect(guest.getKey().getRoom()).toEqual(booking.getRoom());
    expect(booking.getRoom().isCheckedIn()).toBeTruthy();
    expect(guest.getMoney()).toEqual(guestBudget - booking.getPrepaymentCost() - booking.getRestPaymentCost());
  });

  test('check-out', () => {
    const guest = makeGuest();
    const booking = book(guest, 5);
    booking.getRoom().getHotel().getReceptionists()[0]
      .checkIn(guest);

    booking.getRoom().getHotel().getReceptionists()[0]
      .checkOut(guest);

    expect(guest.getKey()).toBeNull();
    expect(booking.getRoom().isFree()).toBeTruthy();
  });
});
