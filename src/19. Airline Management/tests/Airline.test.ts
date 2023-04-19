import Airline from "../src/Airline";
import { faker } from '@faker-js/faker';
import Address from "../src/Flight/WayPoint/Address";
import Airport from "../src/Flight/WayPoint/Airport";
import WayPoint from "../src/Flight/WayPoint/WayPoint";
import FlightPrototype from "../src/Flight/Prototype/FlightPrototype";
import Aircraft from "../src/Flight/Aircraft/Aircraft";
import Seat from "../src/Flight/Aircraft/Seat";
import { SeatClass } from "../src/Flight/Aircraft/SeatClass";
import Flight from "../src/Flight/Flight";
import Crew from "../src/Flight/Crew";
import Pilot from "../src/Authorization/Users/CrewMembers/Pilot";
import Steward from "../src/Authorization/Users/CrewMembers/Steward";
import Customer from "../src/Authorization/Users/Customer/Customer";
import SearchFilter from "../src/Schedule/SearchFilter";
import Passenger from "../src/Itinerary/Reservation/Passenger";
import ReservingNotification from "../src/Notification/ReservingNotification";
import CancelingNotification from "../src/Notification/CancelingNotification";


const system = Airline.getInstance();

// Staff >>

const makeStaff = () => {
  makeAdmin();
  makePilot();
  makeSteward();
  makeCustomer();
}

const makeAdmin = () => {
  const credentials = makeCredentials();
  system.getAuth().registerAdmin(...credentials)
  return system.getAuth().login(...credentials)
}

const makePilot = (): Pilot => {
  const credentials = makeCredentials();
  system.getAuth().registerPilot(...credentials)
  return system.getAuth().login(...credentials) as Pilot
}

const makeSteward = (): Steward => {
  const credentials = makeCredentials();
  system.getAuth().registerSteward(...credentials)
  return system.getAuth().login(...credentials) as Steward
}

const makeCustomer = (): Customer => {
  const credentials = makeCredentials();
  system.getAuth().registerCustomer(...credentials)
  const customer = system.getAuth().login(...credentials) as Customer

  customer.getWallet().add(1000);

  return customer;
}

const makeCredentials = (): [string, string] => ([
  faker.internet.userName(),
  faker.internet.userName(),
])

// << Staff

// Schedule >>

const makeSchedule = () => {
  makeFlight();
  makeFlight();
  makeFlight();
}

const makeFlight = (): Flight => {
  const flight = makePrototype()
    .makeFlight(faker.date.future(), makeCrew());
  system.getSchedule()
    .scheduleFlight(flight)
  return flight;
}

const makeCrew = (): Crew => new Crew(
  [makePilot()],
  [makeSteward()]
);

const makePrototype = (): FlightPrototype => {
  return system.getProtoCatalog()
    .createPrototype(
      makeAircraft(),
      makeWayPoint(),
      makeWayPoint(),
      makeSeatsPrices()
    );
}

const makeWayPoint = (): WayPoint => new WayPoint(
  faker.date.future(),
  makeAirport()
)

// << Schedule

// Park >>

const makeAircraft = (): Aircraft => new Aircraft(makeSeats());

const makeSeatsPrices = (): Map<SeatClass, number> => new Map<SeatClass, number>([
  [SeatClass.Economy, randomInt(10)],
  [SeatClass.Business, randomInt(10)]
])

const makePassenger = (): Passenger => new Passenger(
  faker.name.firstName(),
  faker.name.lastName(),
  faker.datatype.uuid()
);


const makeSeats = (): Set<Seat> => {
  const seats = new Set<Seat>();

  for (let num = 1; num <= 5; num++) {
    seats.add(new Seat(num, SeatClass.Economy));
  }

  for (let num = 6; num <= 10; num++) {
    seats.add(new Seat(num, SeatClass.Business));
  }

  return seats;
}

const makeAirport = (): Airport => new Airport(
  makeAddress()
)

const makeAddress = (): Address => new Address(
  faker.address.country(),
  faker.address.state(),
  faker.address.streetAddress(),
  faker.address.zipCode(),
)

// << Park

const randomInt = (max: number, min: number = 0): number => Math.floor(min + Math.random() * (max - min));


describe('Airline', () => {
  let customer: Customer;

  beforeEach(() => {
    makeStaff();
    makeSchedule();
    customer = makeCustomer();
  });

  test('search flight', () => {
    const targetFlight = system.getSchedule().getFlights().pop();
    expect(
      system.getSchedule()
        .searchFlights(
          new SearchFilter()
            .setArrivalAirport(targetFlight.getArrival().getAirport())
            .setDepartureAirport(targetFlight.getDeparture().getAirport())
            .setDepartureDate(targetFlight.getDeparture().getTime())
        )
    ).toEqual([targetFlight])
  });

  test('reserve', () => {
    const flights = system.getSchedule().getFlights();
    const itinerary = customer.makeItinerary();

    itinerary.createReservation(
      flights[0],
      new Map([[makePassenger(), flights[0].getAircraft().getSeats()[0]]])
    );
    itinerary.createReservation(
      flights[1],
      new Map([[makePassenger(), flights[1].getAircraft().getSeats()[0]]])
    )
    customer.confirmItinerary(itinerary);

    expect(system.getItinerariesCatalog().getCustomerItineraries(customer)).toHaveLength(1);
    expect(itinerary.getReservations()).toHaveLength(2)
    expect(itinerary.getCost()).toBeGreaterThan(0);
    expect(customer.getWallet().getAmount()).toEqual(1000 - itinerary.getCost());
    expect(customer.getNotifications()).toHaveLength(2);
    customer.getNotifications()
      .forEach(notification => expect(notification).toBeInstanceOf(ReservingNotification));
  });

 test('cancel flight', () => {
    const flight = system.getSchedule().getFlights()[0];
    const itinerary = customer.makeItinerary();
    itinerary.createReservation(
      flight,
      new Map([[makePassenger(), flight.getAircraft().getSeats()[1]]])
    );

   customer.confirmItinerary(itinerary);
   flight.cancel()

    expect(customer.getWallet().getAmount()).toEqual(1000);
    expect(customer.getNotifications().pop()).toBeInstanceOf(CancelingNotification);
  });
});
