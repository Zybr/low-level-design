import User from "../Auth/Users/User";

export default class GroupsFilter {
  private nameKeyword: string | null = null;
  private members = new Set<User>;

  public getNameKeyword(): string | null {
    return this.nameKeyword;
  }

  public setNameKeyword(name: string | null): this {
    this.nameKeyword = name;

    return this;
  }

  public getMembers(): User[] {
    return Array.from(this.members);
  }

  public setMembers(members: User[]): this {
    this.members = new Set(members);

    return this;
  }
}
