import Address from "./Address";

export default class Airport {
  public constructor(
    private readonly address: Address
  ) {
  }

  public getAddress(): Address {
    return this.address;
  }
}
