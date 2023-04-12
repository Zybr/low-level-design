import User from "./Users/User";
import Admin from "./Users/Admin";
import Member from "./Users/Member/Member";

export default class Authorization {
  private users = new Map<string, User>()

  public getUsers(): User[] {
    return Array.from(this.users.values());
  }

  public registerAdmin(username: string, password: string) {
    this.assertUniqueUsername(username);
    this.users.set(username, new Admin(username, password));
  }

  public registerMember(username: string, password: string) {
    this.assertUniqueUsername(username);
    this.users.set(username, new Member(username, password));
  }

  public login(username: string, password: string): User {
    if (
      !this.users.get(username)?.isActive()
      || !this.users.get(username)?.isValidPassword(password)
    ) {
      throw new Error('Credentials are not valid');
    }

    return this.users.get(username);
  }

  private assertUniqueUsername(username: string) {
    if (this.users.has(username)) {
      throw new Error('There is a user with the same name');
    }
  }
}
