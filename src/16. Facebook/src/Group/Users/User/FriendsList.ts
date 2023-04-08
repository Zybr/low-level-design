import User from "./User";
import System from "../../../System";

export default class FriendsList {
  private users = new Set<User>();

  public constructor(
    private readonly user,
  ) {
  }

  public getUsers(): User[] {
    return Array.from(this.users);
  }

  public hasUser(fiend: User): boolean {
    return this.users.has(fiend);
  }

  public addUser(friend: User) {
    if (this.user === friend) {
      throw new Error("User can't be added to his own friends list");
    }

    this.users.add(friend);

    System.getInstance()
      .getSubscriptionsList()
      .followUser(this.user, friend);
  }

  public removeUser(friend: User) {
    this.users.delete(friend);

    System.getInstance()
      .getSubscriptionsList()
      .unfollowUser(this.user, friend);
  }
}
