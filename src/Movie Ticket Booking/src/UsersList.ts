import User from "./Persons/User";

export default class UsersList {
  private readonly users = new Set<User>();

  public getUsers(): User[] {
    return Array.from(this.users);
  }

  public addUser(user: User): void {
    if (this.users.has(user)) {
      throw new Error('User is already added');
    }

    this.users.add(user);
  }
}
