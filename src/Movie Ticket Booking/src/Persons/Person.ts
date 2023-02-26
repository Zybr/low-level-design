import Address from "./Address";

export default class Person {
  public constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly address: Address
  ) {
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getAddress(): Address {
    return this.address;
  }
}
