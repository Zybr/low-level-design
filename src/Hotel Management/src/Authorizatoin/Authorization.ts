import User from "./Users/User";
import Guest from "./Users/Guest";
import Hotel from "../Hotel/Hotel";
import Manager from "./Users/Servants/Manager";
import Receptionist from "./Users/Servants/Receptionist";
import Housekeeper from "./Users/Servants/Housekeeper";

export default class Authorization {
  private users = new Map<string, User>();

  public createGuest(username: string, password: string): Guest {
    const user = new Guest(username, password);
    this.users.set(username, user);
    return user;
  }

  public createReceptionists(username: string, password: string, hotel: Hotel): Receptionist {
    const user = new Receptionist(username, password, hotel)
    this.users.set(username, user);
    return user;
  }

  public createHousekeeper(username: string, password: string, hotel: Hotel): Housekeeper {
    const user = new Housekeeper(username, password, hotel)
    this.users.set(username, user);
    return user;
  }

  public createManager(username: string, password: string, hotel: Hotel): Manager {
    const user = new Manager(username, password, hotel)
    this.users.set(username, user);
    return user;
  }

  public login(username, password): User {
    if (!this.users.has(username)) {
      throw new Error(`There is no user with username ${username}`);
    }

    if (!this.users.get(username).isValidPassword(password)) {
      throw new Error('Password is not valid');
    }

    return this.users.get(username);
  }

  private assertNotExistedUsername(username: string): void {
    if (this.users.has(username)) {
      throw new Error('There is user with the same name');
    }
  }
}
