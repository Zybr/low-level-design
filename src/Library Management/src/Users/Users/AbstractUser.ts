import Person from "../People/Person";
import LibraryCard from "./LibraryCard";
import Library from "../../Library";

export default abstract class AbstractUser {
  protected _card: LibraryCard | null = null;

  public constructor(
    protected readonly library: Library,
    protected readonly _person: Person,
    protected readonly _username: string,
    protected _password: string,
  ) {
  }

  public abstract isAdmin(): boolean

  get person(): Person {
    return this._person;
  }

  get username() {
    return this._username;
  }

  get card(): LibraryCard | null {
    return this._card;
  }

  set card(value: LibraryCard | null) {
    this._card = value;
  }

  public isValidPassword(password: string) {
    return this._password === password;
  }

  public resetPassword(oldPassword: string, newPassword: string): boolean {
    if (!this.isValidPassword(oldPassword)) {
      return false;
    }

    this._password = newPassword;

    return true;
  }
}

