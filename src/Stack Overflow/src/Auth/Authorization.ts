import Account from "./Users/Account";
import Writer from "./Users/Writer";
import Moderator from "./Users/Moderator";
import Admin from "./Users/Admin";

export default class Authorization {
  private readonly users = new Map<string, Account>();

  public registerWriter(username: string, password: string): void {
    this.assertUsernameUnique(username);
    this.users.set(username, new Writer(username, password));
  }

  public registerModerator(username: string, password: string): void {
    this.assertUsernameUnique(username);
    this.users.set(username, new Moderator(username, password));
  }

  public registerAdmin(username: string, password: string): void {
    this.assertUsernameUnique(username);
    this.users.set(username, new Admin(username, password));
  }

  public getUsers(): Account[] {
    return Array.from(this.users.values());
  }

  public getUser(username: string): Account | null {
    return this.users.get(username);
  }

  public login(username: string, password: string): Account {
    const user = this.users.get(username);

    if (!user || !user.isValidPassword(password)) {
      throw new Error('Credentials are not valid');
    }

    return user;
  }

  private assertUsernameUnique(username: string): void {
    if (this.users.has(username)) {
      throw new Error(`There ia already user ${username}`);
    }
  }
}
