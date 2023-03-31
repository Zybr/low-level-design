import Address from "./Address";

export default class Person {
  public constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private address: Address,
  ) {
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getAddress(): Address {
    return this.address;
  }
}
