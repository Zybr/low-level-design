import User from "./Users/User";
import Admin from "./Users/Admin";
import Pilot from "./Users/CrewMembers/Pilot";
import Steward from "./Users/CrewMembers/Steward";
import Customer from "./Users/Customer/Customer";
import FrontDeskOfficer from "./Users/FrontDeskOfficer";

export default class Authorization {
  private users = new Map<string, User>();
  private pilots = new Set<Pilot>()
  private stewards = new Set<Steward>()

  public registerAdmin(username: string, password: string) {
    this.assertUniqueUsername(username);
    this.users.set(
      username,
      new Admin(username, password)
    );
  }

  public getPilots(): Pilot[] {
    return Array.from(this.pilots.values());
  }

  public registerPilot(username: string, password: string) {
    this.assertUniqueUsername(username);
    const pilot = new Pilot(username, password);
    this.users.set(username, pilot);
    this.pilots.add(pilot);
  }

  public getStewards(): Steward[] {
    return Array.from(this.stewards.values());
  }

  public registerSteward(username: string, password: string) {
    this.assertUniqueUsername(username);
    const steward = new Steward(username, password)
    this.users.set(username, steward);
    this.stewards.add(steward);
  }

  public registerFrontDeskOfficer(username: string, password: string) {
    this.assertUniqueUsername(username);
    this.users.set(
      username,
      new FrontDeskOfficer(username, password)
    );
  }

  public registerCustomer(username: string, password: string) {
    this.assertUniqueUsername(username);
    this.users.set(
      username,
      new Customer(username, password)
    );
  }

  public login(username: string, password: string): User {
    if (
      !this.users.get(username)?.isActive()
      || !this.users.get(username)?.isValidPassword(password)
    ) {
      throw new Error('Credentials are not correct');
    }

    return this.users.get(username);
  }

  private assertUniqueUsername(username: string) {
    if (this.users.has(username)) {
      throw new Error('There a user with the same username');
    }
  }
}
