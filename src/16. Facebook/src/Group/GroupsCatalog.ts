import Group from "./Group";
import User from "./Users/User/User";
import System from "../System";

export default class GroupsCatalog {
  public readonly groups = new Map<string, Group>();

  public getAll(): Group [] {
    return Array.from(this.groups.values());
  }

  public getByAuthor(user: User): Group[] {
    return Array.from(this.groups.values())
      .filter(group => group.getAuthor() === user);
  }

  public getByUser(user: User): Group[] {
    return Array.from(this.groups.values())
      .filter(group => group.getAuthor() === user || group.hasUser(user));
  }

  public create(author: User, name: string): Group {
    if (this.groups.has(name)) {
      throw new Error('There is a group with the same name');
    }

    const group = new Group(author, name);
    this.groups.set(name, group);

    return group;
  }

  public remove(group: Group) {
    this.groups.delete(group.getName());
    System.getInstance()
      .getSubscriptionsList()
      .unfollowGroup(group);
  }
}
