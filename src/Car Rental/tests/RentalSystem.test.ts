import RentalSystem from "../src/RentalSystem";
import Person from "../src/Users/Person";
import { faker } from "@faker-js/faker";
import Address from "../src/Address";
import Authorization from "../src/Users/Authorization";
import Customer from "../src/Users/Customer";
import Receptionist from "../src/Users/Receptionist";
import AbstractVehicle from "../src/Vehicles/AbstractVehicle";
import Van from "../src/Vehicles/Van";
import VanType from "../src/Vehicles/Enums/VanType";
import Motorcycle from "../src/Vehicles/Motorcycle";
import MotorcycleType from "../src/Vehicles/Enums/MotorcycleType";
import Car from "../src/Vehicles/Car";
import CarType from "../src/Vehicles/Enums/CarType";
import Truck from "../src/Vehicles/Truck";
import TruckType from "../src/Vehicles/Enums/TruckType";
import Park from "../src/Vehicles/Park";
import ChildSeat from "../src/Equipments/ChildSeat";
import Navigation from "../src/Equipments/Navigation";
import SkiRack from "../src/Equipments/SkiRack";
import RoadsideAssistant from "../src/Services/RoadsideAssistant";
import Driver from "../src/Services/Driver";
import WiFi from "../src/Services/WiFi";
import Period from "../src/Reservation/Period";
import RentalBranch from "../src/RentalBranch";
import Location from "../src/Location";
import ParkingStall from "../src/ParkingStall";
import CashPayment from "../src/Payments/CashPayment";
import CardPayment from "../src/Payments/CardPayment";

const system = (): RentalSystem => RentalSystem.getInstance();
const auth = (): Authorization => system().getAuth();
const park = (): Park => system().getPark();

const makePerson = (): Person => new Person(
  faker.name.fullName(),
  faker.phone.number(),
  makeAddress()
);

const makeAddress = (): Address => new Address(
  faker.address.country(),
  faker.address.state(),
  faker.address.city(),
  faker.address.zipCode(),
);

const makeVehicleArgs = (type) => {
  const types = Object.values(type);
  return [
    faker.datatype.string(10),
    faker.word.noun(),
    makePrice(),
    faker.datatype.number(
      types[faker.datatype.number({min: 0, max: types.length - 1})]
    )
  ];
}

const makePrice = (): number => faker.datatype.number({min: 1, max: 10});

const makeVehicle = (): AbstractVehicle<any> => {
  const makers = [
    makeVan,
    makeMotorcycle,
    makeCar,
    makeTruck
  ];

  return makers[faker.datatype.number({min: 0, max: makers.length - 1})]();
}

const makeVan = (): Van => new Van(...makeVehicleArgs(VanType) as [string, string, number, VanType]);
const makeMotorcycle = (): Motorcycle => new Motorcycle(...makeVehicleArgs(MotorcycleType) as [string, string, number, MotorcycleType]);
const makeCar = (): Car => new Car(...makeVehicleArgs(CarType) as [string, string, number, CarType]);
const makeTruck = (): Truck => new Truck(...makeVehicleArgs(TruckType) as [string, string, number, TruckType]);

const makeChildSeat = (): ChildSeat => new ChildSeat(makePrice());
const makeNavigation = (): Navigation => new Navigation(makePrice());
const makeSkiRack = (): SkiRack => new SkiRack(makePrice());

const makeRoadSideAssistant = (): RoadsideAssistant => new RoadsideAssistant(makePrice());
const makeDriver = (): Driver => new Driver(makePrice());
const makeWiFi = (): WiFi => new WiFi(makePrice());

const makePeriod = (): Period => {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setMilliseconds(0);
  start.setSeconds(0);
  start.setHours(faker.datatype.number({min: 0, max: 23}));

  const end = new Date(start.getTime());
  end.setDate(end.getDate() + 1);
  end.setHours(start.getHours() + faker.datatype.number({min: 0, max: 23}));

  return new Period(start, end)
}

const makeBranch = (): RentalBranch => {
  const branch = new RentalBranch(new Location(makeAddress()))

  for (let i = 0; i < 10; i++) {
    branch.addStall(new ParkingStall());
  }

  return branch;
}

describe('RentalSystem', () => {
  const credentials = {
    customer: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    },
    receptionist: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }
  }
  let customer: Customer;
  let receptionist: Receptionist;

  beforeAll(() => {
    auth()
      .registerCustomer(
        makePerson().addMoney(1000),
        credentials.customer.username,
        credentials.customer.password,
      );
    auth()
      .registerReceptionist(
        makePerson(),
        credentials.receptionist.username,
        credentials.receptionist.password,
      );
    customer = auth()
      .login(
        credentials.customer.username,
        credentials.customer.password
      );
    receptionist = auth()
      .login(
        credentials.receptionist.username,
        credentials.receptionist.password
      ) as Receptionist;

    for (let i = 0; i < 10; i++) {
      receptionist.addVehicle(makeVehicle())
    }

    for (let i = 0; i < 3; i++) {
      system().addBranch(makeBranch());
    }

    system().addEquipment(makeChildSeat());
    system().addEquipment(makeNavigation());
    system().addEquipment(makeSkiRack());

    system().addService(makeRoadSideAssistant());
    system().addService(makeDriver());
    system().addService(makeWiFi());
  });

  beforeEach(() => customer.getCurrentReservation()?.cancel());

  test('Register users', () => {
    expect(customer).toBeInstanceOf(Customer);
    expect(receptionist).toBeInstanceOf(Receptionist);
  });

  test('Fill park', () => {
    expect(system().getBranches()).toHaveLength(3);
    system()
      .getBranches()
      .forEach(branch => expect(branch.getFreeStalls()).toHaveLength(10))
    expect(system().getEquipments()).toHaveLength(3);
    expect(system().getServices()).toHaveLength(3);
    expect(park().getVehicles()).toHaveLength(10);
  });

  test('Make reservation', () => {
    const srcVehicleCount = system().getPark().getVehicles().length;
    const vehicle = park().getVehicles()[0];
    const equipment = system().getEquipments()[0];
    const service = system().getServices()[0];
    const period = makePeriod();
    const reservation = customer.makeReservation(
      vehicle,
      period,
      system().getBranches()[0],
      system().getBranches()[1],
    );
    const expectedCost = (vehicle.getPrice() + equipment.getPrice() + service.getPrice()) * period.getLength();

    expect(reservation.isPending()).toBeTruthy();
    expect(customer.getCurrentReservation()).toEqual(reservation);

    reservation.setEquipments([equipment]);
    reservation.setServices([service]);
    expect(reservation.getCost()).toEqual(expectedCost);

    reservation.confirm(new CashPayment(expectedCost).pay(customer.getPerson()));
    expect(system().getPark().getVehicles()).toHaveLength(srcVehicleCount - 1);
    expect(customer.getPerson().getMoney()).toEqual(1000 - expectedCost)
    expect(reservation.isConfirmed()).toBeTruthy();
  });

  test('Cancel reservation', () => {
    const reservation = customer.makeReservation(
      park().getVehicles()[0],
      makePeriod(),
      system().getBranches()[0],
      system().getBranches()[1],
    );

    reservation.confirm(new CashPayment(reservation.getCost()).pay(customer.getPerson()));
    expect(customer.getPerson().getMoney()).toEqual(1000 - reservation.getCost());

    reservation.cancel();
    expect(reservation.isCanceled()).toBeTruthy();
    expect(customer.getPerson().getMoney()).toEqual(1000);
  });

  test('Use reservation', () => {
    const reservation = customer.makeReservation(
      park().getVehicles()[0],
      makePeriod(),
      system().getBranches()[0],
      system().getBranches()[1],
    );

    reservation
      .confirm(
        new CardPayment(reservation.getCost())
          .pay(customer.getPerson())
      )
      .getStartBranch()
      .getStall(reservation.getVehicle().getLicenseNumber())
      .pickupVehicle(customer);
    expect(reservation.isActivated()).toBeTruthy();

    reservation
      .getEndBranch()
      .getFreeStalls()[0]
      .dropVehicle(customer)

    expect(reservation.isDone()).toBeTruthy();
  });
})
