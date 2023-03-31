import Player from "./Player";
import User from "./User";
import Admin from "./Admin";

export default class Authorization {
  private readonly users = new Map<string, User>();

  public registerPlayer(username: string, password: string): Player {
    this.assertUniqueUsername(username);
    const player = new Player(username, password)
    this.users.set(username, player);

    return player;
  }

  public registerAdmin(username: string, password: string): Admin {
    this.assertUniqueUsername(username);
    const admin = new Admin(username, password)
    this.users.set(username, admin);

    return admin;
  }

  public getUser(username: string): User | null {
    return this.users.get(username) || null;
  }

  public login(username: string, password: string): User {
    const user = this.users.get(username)

    if (!user.isValidPassword(password)) {
      throw new Error("User is not defined");
    }

    return user;
  }

  private assertUniqueUsername(username: string): void {
    if (this.users.has(username)) {
      throw new Error('User with that username already exists');
    }
  }
}
