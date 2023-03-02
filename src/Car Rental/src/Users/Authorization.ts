import AbstractUser from "./AbstractUser";
import Customer from "./Customer";
import Receptionist from "./Receptionist";

export default class Authorization {
  private users = new Map<string, AbstractUser>();

  public login(username: string, password: string): AbstractUser {
    const user = this.users.get(username);

    if (
      !user?.isActive() ||
      !user?.isValidPassword(password)
    ) {
      throw new Error('Credentials are not valid');
    }

    return user;
  }

  public registerCustomer(person, username, password: string) {
    if (this.users.has(username)) {
      throw new Error('User with this name is already exists');
    }

    this.users.set(
      username,
      new Customer(
        person,
        username,
        password
      )
    );
  }

  public registerReceptionist(person, username, password: string) {
    if (this.users.has(username)) {
      throw new Error('User with this name is already exists');
    }

    this.users.set(
      username,
      new Receptionist(
        person,
        username,
        password
      )
    );
  }
}
