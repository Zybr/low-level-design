export default class Address {
  public constructor(
    private readonly country: string,
    private readonly city: string,
    private readonly streetAddress: string,
    private readonly zipCode: string,
  ) {
  }

  public getCountry(): string {
    return this.country;
  }

  public getCity(): string {
    return this.city;
  }

  public getStreetAddress(): string {
    return this.streetAddress;
  }

  public getZipCode(): string {
    return this.zipCode;
  }
}
