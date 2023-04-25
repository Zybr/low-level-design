import User from "../Auth/Users/User";

export default class Group {
  private readonly members = new Set<User>;

  public constructor(
    private readonly admin: User,
    private readonly name: string
  ) {
  }

  public getAdmin(): User {
    return this.admin;
  }

  public getName(): string {
    return this.name;
  }

  public getMembers(): User[] {
    return Array.from(this.members.values());
  }

  public hasMember(member: User): boolean {
    return this.members.has(member);
  }

  public addMember(user: User) {
    this.members.add(user);
  }

  public removeMember(user: User) {
    this.members.delete(user);
  }
}
