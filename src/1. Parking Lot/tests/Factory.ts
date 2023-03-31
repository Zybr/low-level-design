import Admin from "../src/Accounts/Admin";
import Person from "../src/Person";
import { faker } from "@faker-js/faker";
import Car from "../src/Vehicles/Car";
import ParkingAgent from "../src/Accounts/ParkingAgent";

export default class Factory {
  public static makeAdmin(): Admin {
    return new Admin(
      Factory.makePerson(),
      faker.internet.userName(),
      faker.internet.password()
    )
  }

  public static makeAgent(): ParkingAgent {
    return new ParkingAgent(
      Factory.makePerson(),
      faker.internet.userName(),
      faker.internet.password()
    );
  }

  public static makeCar(): Car {
    return new Car(faker.datatype.uuid());
  }

  private static makePerson(): Person {
    return new Person()
      .setName(faker.name.fullName())
      .setAddress(faker.address.streetAddress())
      .setCity(faker.address.city())
      .setCountry(faker.address.country())
      .setState(faker.address.state())
      .setZipCode(faker.address.zipCode());
  }
}
