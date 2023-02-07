import AbstractUser from "./AbstractUser";

export default class LibraryCard {
  private _isActive = true;

  public constructor(
    private _member: AbstractUser
  ) {
  }

  get member(): AbstractUser {
    return this._member;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }
}
