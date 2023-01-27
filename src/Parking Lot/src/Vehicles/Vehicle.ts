export default abstract class Vehicle {
  public constructor(
    private licenseNumber: string,
  ) {
  }

  public getLicenseNumber(): string {
    return this.licenseNumber;
  }
}
