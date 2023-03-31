import History from "./History/History";

export default abstract class AbstractVehicle<Type> {
  private free: boolean = true;
  private readonly history = new History();

  public constructor(
    private licenseNumber: string,
    private model: string,
    private price: number,
    private type: Type,
  ) {
  }

  public setLicenseNumber(licenseNumber: string) {
    this.licenseNumber = licenseNumber;
  }

  public getLicenseNumber(): string {
    return this.licenseNumber;
  }

  public setModel(model: string) {
    this.model = model;
  }

  public getModel(): string {
    return this.model;
  }

  public setPrice(price: number) {
    this.price = price;
  }

  public getPrice(): number {
    return this.price;
  }

  public setFree(free: boolean) {
    this.free = free;
  }

  public isFree(): boolean {
    return this.free;
  }

  public setType(type: Type) {
    this.type = type;
  }

  public getType(): Type {
    return this.type
  }

  public getHistory(): History {
    return this.history;
  }
}
