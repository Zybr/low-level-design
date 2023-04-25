import User from "./Users/User";
import Admin from "./Users/Admin";
import AbstractUser from "./Users/AbstractUser/AbstractUser";

export default class Authorization {
  private users = new Map<string, AbstractUser>()

  public createUser(username: string, password: string) {
    this.assertUniqueUsername(username);

    this.users.set(
      username,
      new User(username, password)
    );
  }

  public createAdmin(username: string, password: string) {
    this.assertUniqueUsername(username);

    this.users.set(
      username,
      new Admin(username, password)
    );
  }

  public login(username: string, password: string): AbstractUser {
    if (!this.users.get(username)?.isValidPassword(password)) {
      throw new Error('Credentials are not correct');
    }

    return this.users.get(username);
  }

  private assertUniqueUsername(username: string) {
    if (this.users.has(username)) {
      throw new Error('There is a user with the same username');
    }
  }
}
