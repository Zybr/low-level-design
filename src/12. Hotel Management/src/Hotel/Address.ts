export default class Address {
  public constructor(
    public readonly country: string,
    public readonly state: string,
    public readonly streetAddress: string,
    public readonly zipCode: string,
  ) {
  }
}
