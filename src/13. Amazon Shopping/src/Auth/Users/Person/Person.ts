import Email from "./Email";
import Phone from "./Phone";

export default class Person {
  public constructor(
    private readonly email: Email | null = null,
    private readonly phone: Phone | null = null,
  ) {
  }

  public getEmail(): Email | null {
    return this.email;
  }

  public getPhone(): Phone | null {
    return this.phone;
  }
}
