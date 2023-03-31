import Address from "./Address";

export default class Location {
  public constructor(
    private readonly address: Address
  ) {
  }

  public getAddress(): Address {
    return this.address;
  }
}
