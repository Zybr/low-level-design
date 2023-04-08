export default class Address {
  public constructor(
    private country: string,
    private state: string,
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

  public getStreetAddress(): string {
    return this.streetAddress;
  }

  public getZipCode(): string {
    return this.zipCode;
  }

  public setCountry(country: string) {

  }

  public setState(state: string) {

  }

  public setStreetAddress(streetAddress: string) {

  }

  public setZipCode(zipCode: string) {

  }
}
