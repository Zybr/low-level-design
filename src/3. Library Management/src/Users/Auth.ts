import Librarian from "./Users/Librarian";
import Person from "./People/Person";
import AbstractUser from "./Users/AbstractUser";
import Member from "./Users/Member";
import LibraryCard from "./Users/LibraryCard";
import Library from "../Library";
import Config from "../Config";

export default class Auth {
  private readonly accounts: AbstractUser[] = [];
  private loggedIn = new Set<AbstractUser>();

  public constructor(
    private readonly library: Library,
  ) {
    this.makeSystemUser();
  }

  public registerLibrarian(
    person: Person,
    username: string,
    password: string
  ): LibraryCard {
    if (this.getUser(username)) {
      throw new Error('There is a user with the same "username"')
    }

    const user = new Librarian(
      this.library,
      person,
      username,
      password,
    );

    this.accounts.push(user);
    user.card = new LibraryCard(user);

    return user.card;
  }

  public registerMember(
    person: Person,
    username: string,
    password: string
  ): LibraryCard {
    if (this.getUser(username)) {
      throw new Error('There is a user with the same "username"')
    }

    const user = new Member(
      this.library,
      person,
      username,
      password
    );

    this.accounts.push(user);
    user.card = new LibraryCard(user);

    return user.card;
  }

  public login(username: string, password: string): AbstractUser {
    const user = this.getUser(username);

    if (!user?.isValidPassword(password)) {
      throw new Error('User was not defined');
    }

    this.loggedIn.add(user);

    return user;
  }

  public logout(user: AbstractUser): void {
    this.loggedIn.delete(user);
  }

  public isLoggedIn(user: AbstractUser): boolean {
    return this.loggedIn.has(user);
  }

  public getAdmins(): AbstractUser[] {
    return this.getActiveUsers().filter(account => account.isAdmin());
  }

  public deactivate(member: Member): Member {
    member.card.isActive = false;

    return member;
  }

  public activate(member: Member): Member {
    member.card.isActive = true;

    return member;
  }

  private makeSystemUser(): AbstractUser {
    return this.registerLibrarian(
      new Person(
        'admin',
        'system',
      ),
      Config.SYSTEM_USERNAME,
      Config.SYSTEM_PASSWORD
    ).member;
  }

  private getUser(username: string): AbstractUser | null {
    return this.getActiveUsers().find(account => account.username === username) || null;
  }

  private getActiveUsers(): AbstractUser[] {
    return this.accounts.filter(account => account.card.isActive);
  }
}
