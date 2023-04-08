import User from "./Users/User/User";
import System from "../System";

export default class Group {
  private readonly users = new Set<User>();

  public constructor(
    private readonly author: User,
    private readonly name: string
  ) {
  }

  public getName(): string {
    return this.name;
  }

  public getAuthor(): User {
    return this.author;
  }

  public getUsers(): User[] {
    return Array.from(this.users);
  }

  public hasUser(user: User): boolean {
    return this.users.has(user);
  }

  public addUser(user: User) {
    this.users.add(user);

    System.getInstance()
      .getSubscriptionsList()
      .followGroup(this, user);
  }

  public removeUser(user: User) {
    this.users.delete(user);

    System.getInstance()
      .getSubscriptionsList()
      .unfollowGroup(this, user);
  }
}
