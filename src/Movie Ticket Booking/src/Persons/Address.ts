export default class Address {
  public constructor(
    private readonly country: string,
    private readonly state: string,
    private readonly city: string,
    private readonly zipCode: string,
  ) {
  }
}
