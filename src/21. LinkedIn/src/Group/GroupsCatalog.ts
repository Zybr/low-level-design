import Group from "./Group";
import User from "../Auth/Users/User";
import GroupsFilter from "./GroupsFilter";

export default class GroupsCatalog {
  private groups = new Map<string, Group>()

  public search(filter: GroupsFilter = null): Group[] {
    if (!filter) {
      return this.getGroups();
    }

    return this.getGroups()
      .filter(group => {
        if (
          filter.getNameKeyword()
          &&
          !group.getName().includes(filter.getNameKeyword())
        ) {
          return false;
        }

        if (
          filter.getMembers().length
          && !filter.getMembers().some(member => group.hasMember(member))
        ) {
          return false;
        }

        return true;
      })
  }

  public createGroup(admin: User, name: string): Group {
    this.assertUniqueName(name);

    const group = new Group(admin, name)
    this.groups.set(name, group);

    return group;
  }

  public removeGroup(group: Group) {
    this.groups.delete(group.getName());
  }

  private getGroups(): Group[] {
    return Array.from(this.groups.values());
  }

  private assertUniqueName(name: string) {
    if (this.groups.has(name)) {
      throw new Error('There is a group with the same name');
    }
  }
}
