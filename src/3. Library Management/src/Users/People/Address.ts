export default class Address {
  public constructor(
    private country: string,
    private state: string,
    private city: string,
    private streetAddress: string,
    private zipCode: string,
  ) {
  }

  public getCountry(): string {
    return this.country;
  }

  public getState(): string {
    return this.state;
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
