import Person from "./Users/Person/Person";
import User from "./Users/User";
import Customer from "./Users/Customer/Customer";
import Admin from "./Users/Admin";
import Deliverer from "./Users/Deliverer";

export default class Authorization {
  private users = new Map<string, User>();

  public registerCustomer(
    person: Person,
    username: string,
    password: string,
  ): void {
    this.assertUniqueUsername(username);
    const user = new Customer(person, username, password);
    this.users.set(username, user);
  }

  public registerAdmin(
    person: Person,
    username: string,
    password: string,
  ): void {
    this.assertUniqueUsername(username);
    const user = new Admin(person, username, password);
    this.users.set(username, user);
  }

  public registerDeliverer(
    person: Person,
    username: string,
    password: string,
  ): void {
    this.assertUniqueUsername(username);
    const user = new Deliverer(person, username, password);
    this.users.set(username, user);
  }

  public login(username: string, password: string): User {
    const user = this.users.get(username);

    if (!user) {
      throw new Error("User wasn't found");
    }

    if (!user.isValidPassword(password)) {
      throw new Error('Password is not valid');
    }

    return user;
  }

  public getCustomers(): Customer[] {
    return this.getActiveUsers()
      .filter(user => user instanceof Customer) as Customer[];
  }

  public getAdmins(): Admin[] {
    return this.getActiveUsers()
      .filter(user => user instanceof Admin) as Admin[];
  }

  public getDeliverers(): Deliverer[] {
    return this.getActiveUsers()
      .filter(user => user instanceof Deliverer) as Deliverer[];
  }

  private getActiveUsers(): User[] {
    return Array.from(this.users.values())
      .filter(user => user.isActive());
  }

  private assertUniqueUsername(username: string): void {
    if (this.users.has(username)) {
      throw new Error('There is a user with the same username');
    }
  }
}
