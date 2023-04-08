import User from "./User/User";
import Admin from "./Admin";
import BaseUser from "./BaseUser";

export default class Authorization {
  private readonly users = new Map<string, User>();

  public getUsers(): User[] {
    return Array.from(this.users.values());
  }

  public registerUser(username: string, password: string) {
    this.assertNotExistedUsername(username);
    this.users.set(username, new User(username, password));
  }

  public registerAdmin(username: string, password: string) {
    this.assertNotExistedUsername(username);
    this.users.set(username, new Admin(username, password));
  }

  public login(username: string, password: string): BaseUser {
    if (!this.users.get(username)?.isValidPassword(password)) {
      throw new Error('Invalid credentials');
    }

    return this.users.get(username);
  }

  private assertNotExistedUsername(username: string) {
    if (this.users.has(username)) {
      throw new Error('User with the same username already exists');
    }
  }
}
