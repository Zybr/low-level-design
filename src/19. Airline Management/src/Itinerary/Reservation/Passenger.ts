export default class Passenger {
  public constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly passportNumber: string,
  ) {
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getPassportNumber(): string {
    return this.passportNumber;
  }
}
