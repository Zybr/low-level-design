import Address from "./Address";
import EmailBoxObserver from "../../Notifications/Observers/EmailBoxObserver";
import PostBoxObserver from "../../Notifications/Observers/PostBoxObserver";

export default class Person {
  private _emailBox: EmailBoxObserver | null = null;
  private _postBox: PostBoxObserver | null = null;

  private _firstName: string;
  private _lastName: string;
  private _address: Address | null;
  private _email: string | null;
  private _phone: string | null;

  public constructor(
    firstName: string,
    lastName: string,
    address: Address | null = null,
    email: string | null = null,
    phone: string | null = null,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.phone = phone;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get address(): Address | null {
    return this._address;
  }

  set address(value: Address | null) {
    this._address = value;

    if (this.address) {
      this._postBox = new PostBoxObserver(this.address);
    } else {
      this._postBox = null;
    }
  }

  get email(): string | null {
    return this._email;
  }

  set email(value: string | null) {
    this._email = value;

    if (this.email) {
      this._emailBox = new EmailBoxObserver(this.email);
    } else {
      this._emailBox = null;
    }
  }

  get phone(): string | null {
    return this._phone;
  }

  set phone(value: string | null) {
    this._phone = value;
  }

  get emailBox(): EmailBoxObserver | null {
    return this._emailBox;
  }

  get postBox(): PostBoxObserver | null {
    return this._postBox;
  }
}
